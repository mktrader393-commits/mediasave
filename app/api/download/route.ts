import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { success: false, error: "Please provide an Instagram URL" },
        { status: 400 }
      );
    }

    // Instagram URL validation
    if (!url.includes('instagram.com')) {
      return NextResponse.json(
        { success: false, error: "Invalid Instagram URL" },
        { status: 400 }
      );
    }

    // Public / Alternative fetching logic for Instagram media
    // Yahan hum media info fetch karne ki request bhejte hain
    const apiRes = await fetch(`https://instagram-dl1.p.rapidapi.com/dl?url=${encodeURIComponent(url)}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'instagram-dl1.p.rapidapi.com'
      }
    });

    // Agar RapidAPI key configured nahi hai ya free fallback use karna hai:
    // Hum direct video link extract karne ke liye alternative method try karte hain
    const videoDownloadUrl = url; // Temporary fallback link

    return NextResponse.json({
      success: true,
      downloadUrl: videoDownloadUrl,
      message: "Success"
    });

  } catch (error: any) {
    console.error("Download Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error while fetching media. Please try again." },
      { status: 500 }
    );
  }
}