import { db } from '@/lib/db';
import { acronyms } from '@/lib/schema';
import { eq, or, like } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

export default async function SearchResults({ searchParams }) {
  const term = searchParams.term;
  const page = parseInt(searchParams.page) || 1;

  const offset = (page - 1) * ITEMS_PER_PAGE;

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
    .where(eq(acronyms.approved, true))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const totalCount = await db
    .select({ count: sql`count(*)` })
    .from(acronyms)
    .where(
      or(
        like(acronyms.term, `%${term}%`),
        like(acronyms.definition, `%${term}%`),
        like(acronyms.category, `%${term}%`)
      )
    )
    .where(eq(acronyms.approved, true));

  const totalPages = Math.ceil(totalCount[0].count / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{term}"</h1>
      <div className="space-y-4">
        {results.map((acronym) => (
          <div key={acronym.id} className="bg-secondary p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{acronym.term}</h2>
            <p className="text-muted-foreground">{acronym.definition}</p>
            {acronym.category && (
              <p className="text-sm text-muted-foreground mt-2">Category: {acronym.category}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        {page > 1 && (
          <Link href={`/search/results?term=${term}&page=${page - 1}`}>
            <Button>Previous</Button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/search/results?term=${term}&page=${page + 1}`}>
            <Button>Next</Button>
          </Link>
        )}
      </div>
    </div>
  );
}