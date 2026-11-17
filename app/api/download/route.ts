import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RAPIDAPI_HOST =
  "instagram-video-reel-downloader.p.rapidapi.com";

export async function GET(request: NextRequest) {
  try {
    // 1. Get Instagram URL
    const { searchParams } = new URL(request.url);
    const instagramUrl = searchParams.get("url");

    if (!instagramUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter an Instagram URL.",
        },
        { status: 400 }
      );
    }

    // 2. Validate Instagram URL
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(instagramUrl);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid URL. Please enter a valid Instagram link.",
        },
        { status: 400 }
      );
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    const isInstagram =
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com") ||
      hostname === "instagr.am" ||
      hostname.endsWith(".instagr.am");

    if (
      !isInstagram ||
      !["http:", "https:"].includes(parsedUrl.protocol)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid Instagram URL.",
        },
        { status: 400 }
      );
    }

    // 3. Check RapidAPI key
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "API key is missing. Please configure RAPIDAPI_KEY.",
        },
        { status: 500 }
      );
    }

    // 4. Prepare RapidAPI request
    const apiUrl = new URL(
      `https://${RAPIDAPI_HOST}/instagram/video`
    );

    apiUrl.searchParams.set("url", instagramUrl);

    // 5. Call RapidAPI
    const apiResponse = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(25000),
    });

    // 6. Read API response
    const responseText = await apiResponse.text();

    let result: any;

    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "RapidAPI returned an invalid response.",
        },
        { status: 502 }
      );
    }

    // 7. Handle API errors
    if (!apiResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            result?.message ||
            result?.error ||
            `RapidAPI error: ${apiResponse.status}`,
        },
        { status: 502 }
      );
    }

    // 8. Extract download information
    const videoUrl =
      result?.videoUrl ||
      result?.downloadUrl ||
      result?.downloads?.find(
        (item: any) => item.type === "video"
      )?.downloadUrl ||
      result?.downloads?.[0]?.videoUrl ||
      null;

    const thumbnailUrl =
      result?.thumbnailUrl ||
      result?.downloads?.[0]?.imageUrl ||
      null;

    // 9. Check if video was found
    if (!videoUrl) {
      return NextResponse.json(
        {
          success: false,
          error:
            result?.message ||
            "No downloadable video found. Please try another Instagram link.",
        },
        { status: 404 }
      );
    }

    // 10. Return successful result
    return NextResponse.json({
      success: true,
      videoUrl,
      thumbnailUrl,
      caption: result?.caption || "",
      mediaType: result?.mediaType || "video",
      duration: result?.videoDuration || null,
      author: result?.authorUsername || "",
      downloads: result?.downloads || [],
      data: result,
    });

  } catch (error: any) {
    console.error("MediaSave Download Error:", error);

    if (error?.name === "TimeoutError") {
      return NextResponse.json(
        {
          success: false,
          error: "Request timed out. Please try again.",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}