import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sponsorshipRequests, sponsoredAds } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const [sponsorship] = await db
      .select()
      .from(sponsorshipRequests)
      .where(eq(sponsorshipRequests.id, id))
      .limit(1);

    if (!sponsorship) {
      return NextResponse.json({ error: 'Sponsorship request not found' }, { status: 404 });
    }

    // Create a new sponsored ad
    await db.insert(sponsoredAds).values({
      acronymId: sponsorship.acronymId,
      content: sponsorship.sponsorMessage,
      sponsorName: sponsorship.sponsorName,
      startDate: Date.now(),
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    });

    // Update the sponsorship request status
    await db
      .update(sponsorshipRequests)
      .set({ status: 'approved' })
      .where(eq(sponsorshipRequests.id, id));

    return NextResponse.json({ message: 'Sponsorship request approved successfully' });
  } catch (error) {
    console.error('Error approving sponsorship request:', error);
    return NextResponse.json({ error: 'Failed to approve sponsorship request' }, { status: 500 });
  }
}