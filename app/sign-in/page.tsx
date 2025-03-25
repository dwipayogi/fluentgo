"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        console.log(result);
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Something went wrong");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Welcome back! Please enter your details to sign in.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Password</Label>
              <Input
                id="username"
                placeholder="Enter your name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="text-sm text-center text-gray-500">
              Don't have an account? <Link href="/sign-up" className="font-semibold hover:text-black">Sign Up</Link>
            </p>

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sign In..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
