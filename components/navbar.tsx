import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="px-4 py-6 sticky top-0 bg-white dark:bg-zinc-950 border-b-2 z-50">
      <nav>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">FluentGo</h1>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#feature-translation"
              className="text-sm font-medium transition-colors"
            >
              Translation
            </Link>
            <Link
              href="#feature-pronunciation"
              className="text-sm font-medium transition-colors"
            >
              Pronunciation
            </Link>
            <Link
              href="#feature-gamification"
              className="text-sm font-medium transition-colors"
            >
              Gamification
            </Link>
            <Link
              href="#feature-analytics"
              className="text-sm font-medium transition-colors"
            >
              Analytics
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <Button variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button>
                <a href="/api/auth/login">Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
