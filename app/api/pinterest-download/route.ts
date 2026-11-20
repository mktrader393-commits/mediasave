import { NextRequest, NextResponse } from "next/server";
const MAX_REDIRECTS = 5;

function isPinterestHost(host: string) {
  const value = host.toLowerCase();

  return (
    value === "pinterest.com" ||
    value.endsWith(".pinterest.com") ||
    value === "pin.it" ||
    value.endsWith(".pin.it")
  );
}

function isPinimgHost(host: string) {
  const value = host.toLowerCase();

  return value === "pinimg.com" || value.endsWith(".pinimg.com");
}

function validUrl(value: string, checkHost: (host: string) => boolean) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      checkHost(url.hostname)
    );
  } catch {
    return false;
  }
}

async function safeFetch(
  initialUrl: string,
  checkHost: (host: string) => boolean,
  headers: Record<string, string>
) {
  let currentUrl = initialUrl;

  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    if (!validUrl(currentUrl, checkHost)) {
      throw new Error("This URL is not supported.");
    }

    const response = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual",
      headers,
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });

    if (
      response.status >= 300 &&
      response.status < 400
    ) {
      const location = response.headers.get("location");

      if (!location || i === MAX_REDIRECTS) {
        throw new Error("Unable to follow this Pinterest link.");
      }

      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    return response;
  }

  throw new Error("Too many redirects.");
}

function decodeUrl(value: string) {
  return value
    .replace(/\\u002F/gi, "/")
    .replace(/\\u003A/gi, ":")
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&")
    .replace(/\\u0026/gi, "&")
    .replace(/&quot;/g, '"');
}

function getAttribute(tag: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const match = tag.match(
    new RegExp(
      `\\b${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
      "i"
    )
  );

  return match?.[1] ?? match?.[2] ?? match?.[3] ?? "";
}

function extractVideoUrl(html: string) {
  const candidates: string[] = [];

  const tags = html.match(/<meta\b[^>]*>/gi) || [];

  for (const tag of tags) {
    const property = getAttribute(tag, "property").toLowerCase();
    const name = getAttribute(tag, "name").toLowerCase();

    if (
      property === "og:video" ||
      property === "og:video:url" ||
      property === "og:video:secure_url" ||
      name === "twitter:player:stream"
    ) {
      const content = getAttribute(tag, "content");

      if (content) candidates.push(content);
    }
  }

  const patterns = [
    /https?:\\?\/\\?\/[^"'\\\s<>]+?\.mp4(?:\?[^"'\\\s<>]*)?/gi,
    /https?:\/\/[^"'\\\s<>]+?\.mp4(?:\?[^"'\\\s<>]*)?/gi,
  ];

  for (const pattern of patterns) {
    const matches = html.match(pattern) || [];
    candidates.push(...matches);
  }

  for (const candidate of candidates) {
    const cleaned = decodeUrl(candidate.trim()).replace(/&amp;/g, "&");

    if (!validUrl(cleaned, isPinimgHost)) continue;

    try {
      const parsed = new URL(cleaned);

      if (/\.mp4$/i.test(parsed.pathname)) {
        return parsed.toString();
      }
    } catch {
      // Ignore invalid media URLs.
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > 10000) {
      return NextResponse.json(
        { success: false, error: "Request is too large." },
        { status: 413 }
      );
    }

    const body = await request.json().catch(() => null);
    const input = body?.url;

    if (typeof input !== "string" || input.length > 2048) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid Pinterest link." },
        { status: 400 }
      );
    }

    const submittedUrl = input.trim();

    if (!validUrl(submittedUrl, isPinterestHost)) {
      return NextResponse.json(
        { success: false, error: "Only Pinterest links are supported." },
        { status: 400 }
      );
    }

    const parsed = new URL(submittedUrl);

    if (
      !isPinimgHost(parsed.hostname) &&
      !/\/pin\//i.test(parsed.pathname) &&
      !["pin.it", "www.pin.it"].includes(parsed.hostname)
    ) {
      return NextResponse.json(
        { success: false, error: "Please enter an individual Pinterest Pin link." },
        { status: 400 }
      );
    }

    const response = await safeFetch(
      submittedUrl,
      isPinterestHost,
      {
        "User-Agent": "Mozilla/5.0 (compatible; MediaSave/1.0)",
        Accept: "text/html,application/xhtml+xml",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Pinterest could not provide this public Pin. Please try another link.",
        },
        { status: 422 }
      );
    }

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("text/html")) {
      return NextResponse.json(
        { success: false, error: "Pinterest did not return a supported Pin page." },
        { status: 422 }
      );
    }

    const size = Number(response.headers.get("content-length") || 0);

    if (size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Pinterest page is too large to process." },
        { status: 422 }
      );
    }

    const html = await response.text();

    if (html.length > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Pinterest page is too large to process." },
        { status: 422 }
      );
    }

    const videoUrl = extractVideoUrl(html);

    if (!videoUrl) {
  const finalHost = (() => {
    try {
      return new URL(response.url || submittedUrl).hostname;
    } catch {
      return "unknown";
    }
  })();

  const diagnostics = {
    status: response.status,
    finalHost,
    contentType,
    htmlLength: html.length,
    containsPinimg: /pinimg\.com/i.test(html),
    containsMp4: /\.mp4/i.test(html),
    looksLikeChallenge:
      /captcha|robot|verify you are human|access denied|temporarily blocked/i.test(
        html
      ),
  };

  return NextResponse.json(
    {
      success: false,
      error: `No supported public MP4 video was found. Diagnostic: ${JSON.stringify(diagnostics)}`,
    },
    { status: 404 }
  );
}

    const downloadUrl =
      `/api/pinterest-download?media=${encodeURIComponent(videoUrl)}`;

    return NextResponse.json({
      success: true,
      downloadUrl,
      message: "Public Pinterest video found.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process this Pinterest link right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const mediaUrl = request.nextUrl.searchParams.get("media");

    if (
      !mediaUrl ||
      mediaUrl.length > 4096 ||
      !validUrl(mediaUrl, isPinimgHost)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid video URL." },
        { status: 400 }
      );
    }

    const response = await safeFetch(
      mediaUrl,
      isPinimgHost,
      {
        "User-Agent": "Mozilla/5.0 (compatible; MediaSave/1.0)",
        Accept: "video/mp4,video/*;q=0.9,*/*;q=0.5",
        Referer: "https://www.pinterest.com/",
      }
    );

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { success: false, error: "Unable to retrieve this video." },
        { status: 502 }
      );
    }

    const type = response.headers.get("content-type") || "";

    if (
      !type.toLowerCase().startsWith("video/") &&
      !type.toLowerCase().includes("application/octet-stream")
    ) {
      return NextResponse.json(
        { success: false, error: "The source did not return a video file." },
        { status: 415 }
      );
    }

    const headers = new Headers({
      "Content-Type": type,
      "Content-Disposition": 'attachment; filename="mediasave-pinterest-video.mp4"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });

    const length = response.headers.get("content-length");

    if (length) headers.set("Content-Length", length);

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Video download failed. Please try again." },
      { status: 500 }
    );
  }
}