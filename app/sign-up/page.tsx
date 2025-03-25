"use client";

import { useSignUp } from "@clerk/nextjs";
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

export default function SignUpPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        username: username,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors[0]?.message || "Something went wrong");
    }
  };

  const handleVerify = async () => {
    if (!isLoaded || !signUp) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Verification failed");
    }
  };

  if(pendingVerification) {
    return (
      <main>
        <Card className="w-full max-w-md mx-auto mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Verify Email</CardTitle>
            <CardDescription>
              Please enter the verification code sent to your email.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleVerify} className="space-y-4">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter the verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Welcome! Please enter your details to create an account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold hover:text-black">
                Sign In
              </Link>
            </p>

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sign Up..." : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
