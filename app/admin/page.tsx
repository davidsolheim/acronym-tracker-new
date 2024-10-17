import { db } from '@/lib/db';
import { acronyms, users, sponsoredAds, sponsorshipRequests } from '@/lib/schema';
import { count, eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  const [userCount] = await db.select({ value: count() }).from(users);
  const [pendingAcronyms] = await db.select({ value: count() }).from(acronyms).where(eq(acronyms.approved, false));
  const [sponsoredCount] = await db.select({ value: count() }).from(sponsoredAds);
  const [pendingSponsorships] = await db.select({ value: count() }).from(sponsorshipRequests).where(eq(sponsorshipRequests.status, 'pending'));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-4xl font-bold">{userCount.value}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Pending Acronyms</h2>
          <p className="text-4xl font-bold">{pendingAcronyms.value}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Sponsored Acronyms</h2>
          <p className="text-4xl font-bold">{sponsoredCount.value}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Pending Sponsorships</h2>
          <p className="text-4xl font-bold">{pendingSponsorships.value}</p>
        </div>
      </div>
      <div className="space-y-4">
        <Link href="/admin/acronyms">
          <Button className="w-full">Manage Acronyms</Button>
        </Link>
        <Link href="/admin/sponsored">
          <Button className="w-full">Manage Sponsored Ads</Button>
        </Link>
        <Link href="/admin/sponsorships">
          <Button className="w-full">Manage Sponsorship Requests</Button>
        </Link>
      </div>
    </div>
  );
}