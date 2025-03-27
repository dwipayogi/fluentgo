"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, loading } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="px-4 py-6 sticky top-0 bg-white dark:bg-zinc-950 border-b-2 z-50">
      <nav>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="text-2xl font-bold">FluentGo</a>
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
            {!loading && (
              user ? (
              <Button variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              ) : (
              <Button>
                <Link href="/signin">Sign In</Link>
              </Button>
              )
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
