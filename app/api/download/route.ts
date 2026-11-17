import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { success: false, error: 'Instagram URL is missing' },
      { status: 400 }
    );
  }

  if (!url.includes('instagram.com/')) {
    return NextResponse.json(
      { success: false, error: 'Invalid Instagram URL' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'API key is missing' },
      { status: 500 }
    );
  }

  try {
    const apiResponse = await fetch(
      `https://instagram-video-reel-downloader.p.rapidapi.com/instagram/video?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
            'instagram-video-reel-downloader.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }
    );

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || 'RapidAPI request failed',
        },
        { status: apiResponse.status }
      );
    }

    const downloadUrl =
      data?.videoUrl ||
      data?.downloads?.[0]?.downloadUrl ||
      data?.data?.videoUrl ||
      data?.data?.downloads?.[0]?.downloadUrl ||
      data?.result?.videoUrl ||
      data?.url;

    if (!downloadUrl) {
      return NextResponse.json({
        success: false,
        error: 'Video URL not found in API response',
      });
    }

    return NextResponse.json({
      success: true,
      downloadUrl,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Server error. Please try again.',
      },
      { status: 500 }
    );
  }
}