import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sponsoredAds } from '@/lib/schema';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const newSponsoredAd = await db.insert(sponsoredAds).values({
      acronymId: body.acronymId,
      content: body.content,
      sponsorName: body.sponsorName,
      startDate: new Date(body.startDate).getTime(),
      endDate: new Date(body.endDate).getTime(),
    }).returning();

    return NextResponse.json(newSponsoredAd[0], { status: 201 });
  } catch (error) {
    console.error('Error creating sponsored ad:', error);
    return NextResponse.json({ error: 'Failed to create sponsored ad' }, { status: 500 });
  }
}