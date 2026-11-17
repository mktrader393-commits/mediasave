import {
  connection,
  NextRequest,
  NextResponse,
} from "next/server";

const RAPIDAPI_HOST =
  "instagram-video-reel-downloader.p.rapidapi.com";

export async function GET(request: NextRequest) {
  // IMPORTANT: Keep this OUTSIDE the try/catch.
  // Next.js uses this to stop build-time prerendering.
  await connection();

  try {
    const requestUrl = new URL(request.url);
    const instagramUrl = requestUrl.searchParams.get("url");

    if (!instagramUrl) {
      return NextResponse.json(
        { success: false, error: "Instagram URL is required." },
        { status: 400 }
      );
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(instagramUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid Instagram URL." },
        { status: 400 }
      );
    }

    const allowedHosts = [
      "instagram.com",
      "www.instagram.com",
      "m.instagram.com",
      "instagr.am",
      "www.instagr.am",
    ];

    if (
      !["http:", "https:"].includes(parsedUrl.protocol) ||
      !allowedHosts.includes(parsedUrl.hostname.toLowerCase())
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid Instagram link.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "API key is not configured.",
        },
        { status: 500 }
      );
    }

    const apiUrl = new URL(
      `https://${RAPIDAPI_HOST}/instagram/video`
    );

    apiUrl.searchParams.set("url", instagramUrl);

    const apiResponse = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const responseText = await apiResponse.text();

    let result: unknown;

    try {
      result = JSON.parse(responseText);
    } catch {
      result = {
        message: responseText || "Invalid response from API.",
      };
    }

    if (!apiResponse.ok) {
      console.error("RapidAPI error:", result);

      return NextResponse.json(
        {
          success: false,
          error: "Instagram API request failed.",
          details: result,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Download API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}