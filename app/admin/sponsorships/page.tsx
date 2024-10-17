import { db } from '@/lib/db';
import { sponsorshipRequests, acronyms } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';

export default async function ManageSponsorships() {
  const pendingSponsorships = await db
    .select({
      id: sponsorshipRequests.id,
      acronymTerm: acronyms.term,
      sponsorName: sponsorshipRequests.sponsorName,
      sponsorWebsite: sponsorshipRequests.sponsorWebsite,
      sponsorMessage: sponsorshipRequests.sponsorMessage,
      contactEmail: sponsorshipRequests.contactEmail,
    })
    .from(sponsorshipRequests)
    .innerJoin(acronyms, eq(sponsorshipRequests.acronymId, acronyms.id))
    .where(eq(sponsorshipRequests.status, 'pending'));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Sponsorship Requests</h1>
      <div className="space-y-4">
        {pendingSponsorships.map((sponsorship) => (
          <div key={sponsorship.id} className="bg-secondary p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{sponsorship.acronymTerm}</h2>
            <p className="text-muted-foreground mb-2">Sponsor: {sponsorship.sponsorName}</p>
            <p className="text-muted-foreground mb-2">Website: {sponsorship.sponsorWebsite}</p>
            <p className="text-muted-foreground mb-2">Message: {sponsorship.sponsorMessage}</p>
            <p className="text-muted-foreground mb-2">Contact: {sponsorship.contactEmail}</p>
            <div className="flex space-x-2 mt-4">
              <form action={`/api/sponsorships/${sponsorship.id}/approve`} method="POST">
                <Button type="submit" className="bg-green-500 hover:bg-green-600">Approve</Button>
              </form>
              <form action={`/api/sponsorships/${sponsorship.id}/reject`} method="POST">
                <Button type="submit" variant="destructive">Reject</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}