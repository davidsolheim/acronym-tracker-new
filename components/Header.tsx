"use client"

import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@/components/ui/button';
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function Header() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-secondary py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">AcronymTracker</Link>
        <nav className="space-x-4">
          <Link href="/search">Search</Link>
          <Link href="/submit">Submit</Link>
          <Link href="/sponsor">Sponsor</Link>
          {session?.user?.role === 'admin' && (
            <Link href="/admin">Admin</Link>
          )}
          {session ? (
            <Button onClick={() => signOut()}>Sign out</Button>
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>
      </div>
    </header>
  )
}