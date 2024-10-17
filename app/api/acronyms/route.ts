import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { acronyms } from '@/lib/schema';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const newAcronym = await db.insert(acronyms).values({
      term: body.term,
      definition: body.definition,
      category: body.category,
      approved: false,
    }).returning();

    return NextResponse.json(newAcronym[0], { status: 201 });
  } catch (error) {
    console.error('Error submitting acronym:', error);
    return NextResponse.json({ error: 'Failed to submit acronym' }, { status: 500 });
  }
}