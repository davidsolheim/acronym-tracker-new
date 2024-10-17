import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { acronyms } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await db.update(acronyms)
      .set({ approved: true })
      .where(eq(acronyms.id, id));

    return NextResponse.json({ message: 'Acronym approved successfully' });
  } catch (error) {
    console.error('Error approving acronym:', error);
    return NextResponse.json({ error: 'Failed to approve acronym' }, { status: 500 });
  }
}