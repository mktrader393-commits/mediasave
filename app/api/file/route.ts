import {
  connection,
  NextRequest,
  NextResponse,
} from "next/server";
function isAllowedHost(hostname: string) {
  const host = hostname.toLowerCase();

  return (
    host === "cdninstagram.com" ||
    host.endsWith(".cdninstagram.com") ||
    host === "fbcdn.net" ||
    host.endsWith(".fbcdn.net")
  );
}

function isValidVideoUrl(url: URL) {
  return (
    url.protocol === "https:" &&
    url.port === "" &&
    !url.username &&
    !url.password &&
    isAllowedHost(url.hostname)
  );
}

export async function GET(request: NextRequest) {
  await connection();

  try {
    const videoUrl = request.nextUrl.searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required." },
        { status: 400 }
      );
    }

    let currentUrl: URL;

    try {
      currentUrl = new URL(videoUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid video URL." },
        { status: 400 }
      );
    }

    if (!isValidVideoUrl(currentUrl)) {
      return NextResponse.json(
        { error: "Unsupported video source." },
        { status: 400 }
      );
    }

    let response: Response | null = null;
    let redirectCount = 0;

    while (true) {
      response = await fetch(currentUrl.toString(), {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
        signal: AbortSignal.timeout(30000),
        headers: {
          Accept: "video/mp4",
        },
      });

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        if (redirectCount >= 5) {
          return NextResponse.json(
            { error: "Too many video redirects." },
            { status: 502 }
          );
        }

        const location = response.headers.get("location");

        if (!location) {
          return NextResponse.json(
            { error: "Invalid video redirect." },
            { status: 502 }
          );
        }

        const nextUrl = new URL(location, currentUrl);

        if (!isValidVideoUrl(nextUrl)) {
          return NextResponse.json(
            { error: "Unsupported video redirect." },
            { status: 502 }
          );
        }

        currentUrl = nextUrl;
        redirectCount++;
        continue;
      }

      break;
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch video." },
        { status: 502 }
      );
    }

    const contentType = (
      response.headers.get("content-type") || ""
    )
      .split(";")[0]
      .trim()
      .toLowerCase();

    if (contentType !== "video/mp4") {
      return NextResponse.json(
        {
          error:
            "The source did not return a confirmed MP4 video.",
        },
        { status: 502 }
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { error: "Video file is empty." },
        { status: 502 }
      );
    }

    const headers = new Headers({
      "Content-Type": "video/mp4",
      "Content-Disposition":
        'attachment; filename="MediaSave-Video.mp4"',
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    });

    const contentLength = response.headers.get("content-length");

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Video download error:", error);

    return NextResponse.json(
      {
        error: "Video download failed. Please try again.",
      },
      { status: 500 }
    );
  }
}