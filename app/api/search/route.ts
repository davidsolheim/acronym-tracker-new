import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { acronyms } from '@/lib/schema';
import { eq, or, like } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');

  if (!term) {
    return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
  }

  const results = await db
    .select()
    .from(acronyms)
    .where(
      or(
        like(acronyms.term, `%${term}%`),
        like(acronyms.definition, `%${term}%`),
        like(acronyms.category, `%${term}%`)
      )
    )
    .where(eq(acronyms.approved, true));

  return NextResponse.json(results);
}