"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { AuthLink } from "@/components/auth/auth-link";
import { AuthOAuthButton } from "@/components/auth/auth-oauth-button";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setLoading(true);
      setError("");
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setError(err.errors?.[0]?.message || "Failed to sign in with Google");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 lg:px-8">
      <AuthCard
        title="Sign In"
        description="Welcome back! Please enter your details to sign in."
      >
        <CardContent className="space-y-4">
          <AuthOAuthButton provider="google" onClick={handleGoogleSignIn} />

          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-300" />
            <span className="relative bg-white dark:bg-gray-950 px-2 text-sm text-gray-500">
              or continue with
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthFormField
              id="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <AuthFormField
              id="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <AuthLink
            text="Don't have an account?"
            linkText="Sign Up"
            href="/sign-up"
          />
        </CardFooter>
      </AuthCard>
    </main>
  );
}
