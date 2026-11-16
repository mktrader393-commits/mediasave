import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json(
        { success: false, error: "Instagram link enter karein." },
        { status: 400 }
      );
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(videoUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid URL." },
        { status: 400 }
      );
    }

    const allowedHosts = [
      "instagram.com",
      "www.instagram.com",
    ];

    if (!allowedHosts.includes(parsedUrl.hostname)) {
      return NextResponse.json(
        { success: false, error: "Valid Instagram link enter karein." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://www.instagram.com/oembed/?url=${encodeURIComponent(videoUrl)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Instagram ne request accept nahi ki. Dobara try karein.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      title: data.title || "Instagram Post",
      thumbnail: data.thumbnail_url || null,
      downloadUrl: null,
      message: "Post details mil gayi hain. Direct video download abhi configured nahi hai.",
    });

  } catch (error) {
    console.error("Instagram API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server connection error. Dobara try karein.",
      },
      { status: 500 }
    );
  }
}