import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sponsorshipRequests } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await db
      .update(sponsorshipRequests)
      .set({ status: 'rejected' })
      .where(eq(sponsorshipRequests.id, id));

    return NextResponse.json({ message: 'Sponsorship request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting sponsorship request:', error);
    return NextResponse.json({ error: 'Failed to reject sponsorship request' }, { status: 500 });
  }
}