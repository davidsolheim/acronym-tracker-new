import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { acronyms } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await db.delete(acronyms).where(eq(acronyms.id, id));

    return NextResponse.json({ message: 'Acronym rejected and deleted successfully' });
  } catch (error) {
    console.error('Error rejecting acronym:', error);
    return NextResponse.json({ error: 'Failed to reject acronym' }, { status: 500 });
  }
}