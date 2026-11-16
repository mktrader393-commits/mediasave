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

    let downloadUrl = "";

    // 1st API Try karein
    try {
      const res1 = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(url)}`);
      const data1 = await res1.json();
      if (data1 && data1.status && data1.data && data1.data.length > 0) {
        downloadUrl = data1.data[0].url;
      }
    } catch (e) {
      console.log("API 1 failed, trying fallback...");
    }

    // Agar 1st fail ho jaye toh 2nd free endpoint try karein
    if (!downloadUrl) {
      try {
        const res2 = await fetch(`https://instagram.guru/api?url=${encodeURIComponent(url)}`);
        const data2 = await res2.json();
        if (data2 && data2.download_url) {
          downloadUrl = data2.download_url;
        }
      } catch (e) {
        console.log("API 2 failed too.");
      }
    }

    // Agar phir bhi link na mile toh user ko saaf error dein
    if (!downloadUrl) {
      return NextResponse.json(
        { success: false, error: "Instagram servers are busy. Please try a different reel link." },
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
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}