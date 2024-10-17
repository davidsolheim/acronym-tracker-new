import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sponsorshipRequests, acronyms } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // Check if the acronym exists
    const existingAcronym = await db.select().from(acronyms).where(eq(acronyms.term, body.acronym)).limit(1);

    if (existingAcronym.length === 0) {
      return NextResponse.json({ error: 'Acronym not found' }, { status: 404 });
    }

    const newSponsorshipRequest = await db.insert(sponsorshipRequests).values({
      acronymId: existingAcronym[0].id,
      sponsorName: body.sponsorName,
      sponsorWebsite: body.sponsorWebsite,
      sponsorMessage: body.sponsorMessage,
      contactEmail: body.contactEmail,
      status: 'pending',
    }).returning();

    return NextResponse.json(newSponsorshipRequest[0], { status: 201 });
  } catch (error) {
    console.error('Error submitting sponsorship request:', error);
    return NextResponse.json({ error: 'Failed to submit sponsorship request' }, { status: 500 });
  }
}