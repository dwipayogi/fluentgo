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
    <header className="px-4 py-6 sticky top-0 border-b-2 z-50 bg-indigo-50 dark:bg-zinc-950 border-indigo-200 dark:border-zinc-800 transition-colors duration-300">
      <nav>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-indigo-400">FluentGo</a>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#feature-translation"
              className="text-sm font-medium transition-colors hover:text-indigo-400"
            >
              Translation
            </Link>
            <Link
              href="#feature-pronunciation"
              className="text-sm font-medium transition-colors hover:text-indigo-400"
            >
              Pronunciation
            </Link>
            <Link
              href="#feature-gamification"
              className="text-sm font-medium transition-colors hover:text-indigo-400"
            >
              Gamification
            </Link>
            <Link
              href="#feature-analytics"
              className="text-sm font-medium transition-colors hover:text-indigo-400"  
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
              <Button className="bg-indigo-500 hover:bg-indigo-400">
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
