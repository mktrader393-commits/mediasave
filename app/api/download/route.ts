import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url || !url.includes('instagram.com')) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid Instagram URL" },
        { status: 400 }
      );
    }

    // Free public API endpoint jo direct video download link nikal kar deta hai
    const response = await fetch(`https://apis.davidcyriltech.my.id/instagram?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    // Check karein ke video link mila ya nahi
    let downloadUrl = "";
    if (data && data.success && data.download_url) {
      downloadUrl = data.download_url;
    } else if (data && data.url) {
      downloadUrl = data.url;
    } else {
      // Fallback agar API busy ho
      downloadUrl = data?.video_url || data?.data?.[0]?.url || "";
    }

    if (!downloadUrl) {
      return NextResponse.json(
        { success: false, error: "Could not extract video. Please try another link." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      downloadUrl: downloadUrl,
    });

  } catch (error: any) {
    console.error("Download Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}