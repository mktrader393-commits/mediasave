import { NextRequest, NextResponse } from "next/server";

const RAPIDAPI_HOST =
  "instagram-video-reel-downloader.p.rapidapi.com";

export async function GET(request: NextRequest) {
  try {
    // Get Instagram URL
    const instagramUrl = request.nextUrl.searchParams.get("url");

    if (!instagramUrl) {
      return NextResponse.json(
        { success: false, error: "Instagram URL is required." },
        { status: 400 }
      );
    }

    // Validate Instagram URL
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(instagramUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid URL." },
        { status: 400 }
      );
    }

    const allowedHosts = [
      "instagram.com",
      "www.instagram.com",
      "m.instagram.com",
    ];

    if (
      !["http:", "https:"].includes(parsedUrl.protocol) ||
      !allowedHosts.includes(parsedUrl.hostname)
    ) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid Instagram link." },
        { status: 400 }
      );
    }

    // Get API key from Vercel environment variables
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "API key is not configured." },
        { status: 500 }
      );
    }

    // Prepare RapidAPI request
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

    // Read API response
    const responseText = await apiResponse.text();

    let result: unknown;

    try {
      result = JSON.parse(responseText);
    } catch {
      result = {
        message: responseText || "Invalid response from API.",
      };
    }

    // Handle API errors
    if (!apiResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Instagram API request failed.",
          details: result,
        },
        { status: 502 }
      );
    }

    // Return successful response
    return NextResponse.json(result, { status: 200 });

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