import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    const oembed = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`, {
      // Revalidate CDN cache for a day
      next: { revalidate: 86400 }
    });
    if (!oembed.ok) throw new Error('Failed to fetch oEmbed');
    const data = await oembed.json();

    const res = NextResponse.json({ title: data.title, thumbnail_url: data.thumbnail_url });
    res.headers.set('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'oEmbed failed' }, { status: 500 });
  }
}
