import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to AcronymTracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Featured Acronyms</h2>
          <p>Featured acronyms will be displayed here.</p>
        </div>
        <div className="space-y-4">
          <Link href="/search">
            <Button className="w-full">Search Acronyms</Button>
          </Link>
          <Link href="/submit">
            <Button className="w-full">Submit New Acronym</Button>
          </Link>
          <Link href="/sponsor">
            <Button className="w-full">Sponsor an Acronym</Button>
          </Link>
          <Link href="/admin">
            <Button className="w-full" variant="outline">Admin Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}