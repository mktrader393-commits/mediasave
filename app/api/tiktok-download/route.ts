import { NextRequest, NextResponse } from "next/server";

const TIKTOK_HOSTS = [
  "tiktok.com",
  "www.tiktok.com",
  "m.tiktok.com",
  "vt.tiktok.com",
  "vm.tiktok.com",
];

function isValidTikTokUrl(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    return (
      url.protocol === "https:" &&
      TIKTOK_HOSTS.some(
        (allowed) => host === allowed || host.endsWith("." + allowed)
      )
    );
  } catch {
    return false;
  }
}

function isValidMediaUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const videoUrl = body?.url;

    if (
      typeof videoUrl !== "string" ||
      !isValidTikTokUrl(videoUrl)
    ) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid TikTok URL." },
        { status: 400 }
      );
    }

    const form = new URLSearchParams();
    form.set("url", videoUrl);
    form.set("hd", "1");

    const response = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      throw new Error("TikTok service is temporarily unavailable.");
    }

    const result = await response.json();

    if (result?.code !== 0 || !result?.data) {
      return NextResponse.json(
        {
          success: false,
          error: result?.msg || "Unable to process this TikTok video.",
        },
        { status: 502 }
      );
    }

    const data = result.data;

    // Prefer HD no-watermark video, then standard no-watermark video.
    const downloadUrl = data.play || data.hdplay;
    if (
      typeof downloadUrl !== "string" ||
      !isValidMediaUrl(downloadUrl)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A watermark-free video is not available for this link.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      title: data.title || "TikTok Video",
      cover: data.cover || null,
      author: data.author?.nickname || "",
      downloadUrl: "/api/tiktok-download?media=" +
        encodeURIComponent(downloadUrl),
     quality: data.play ? "Standard" : "HD",
    });
  } catch (error) {
    console.error("TikTok downloader error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process this video right now. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const mediaUrl = request.nextUrl.searchParams.get("media");

    if (!mediaUrl || !isValidMediaUrl(mediaUrl)) {
      return NextResponse.json(
        { success: false, error: "Invalid download URL." },
        { status: 400 }
      );
    }

    const upstream = await fetch(mediaUrl, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(60000),
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { success: false, error: "Video download failed. Please try again." },
        { status: 502 }
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", "video/mp4");
    headers.set(
      "Content-Disposition",
      'attachment; filename="mediasave-tiktok.mp4"'
    );
    headers.set("Cache-Control", "no-store");

    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("TikTok download stream error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to download this video." },
      { status: 500 }
    );
  }
}