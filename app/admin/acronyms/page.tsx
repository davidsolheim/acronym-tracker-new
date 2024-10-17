import { db } from '@/lib/db';
import { acronyms } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';

export default async function ManageAcronyms() {
  const pendingAcronyms = await db.select().from(acronyms).where(eq(acronyms.approved, false));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Acronyms</h1>
      <div className="space-y-4">
        {pendingAcronyms.map((acronym) => (
          <div key={acronym.id} className="bg-secondary p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{acronym.term}</h2>
            <p className="text-muted-foreground mb-2">{acronym.definition}</p>
            {acronym.category && (
              <p className="text-sm text-muted-foreground mb-2">Category: {acronym.category}</p>
            )}
            <div className="flex space-x-2">
              <form action={`/api/acronyms/${acronym.id}/approve`} method="POST">
                <Button type="submit" className="bg-green-500 hover:bg-green-600">Approve</Button>
              </form>
              <form action={`/api/acronyms/${acronym.id}/reject`} method="POST">
                <Button type="submit" variant="destructive">Reject</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}