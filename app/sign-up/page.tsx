"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { AuthLink } from "@/components/auth/auth-link";
import { VerificationForm } from "@/components/auth/verification-form";
import { AuthOAuthButton } from "@/components/auth/auth-oauth-button";

export default function SignUpPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(
        err.errors?.[0]?.message || "Something went wrong during sign up"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded || !signUp) return;
    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Verification not complete. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    if (!isLoaded || !signUp) return;
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      console.error("Resend code error:", err);
      setError(
        err.errors?.[0]?.message || "Failed to resend verification code"
      );
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      console.error("Google sign up error:", err);
      setError(err.errors?.[0]?.message || "Failed to sign up with Google");
    }
  };

  if (pendingVerification) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 lg:px-8">
        <AuthCard
          title="Verify Your Email"
          description="We have sent a verification code to your email address. Please enter it below to verify your account."
          footer={
            <AuthLink text="Back to" linkText="Sign In" href="/sign-in" />
          }
        >
          <CardContent className="space-y-4">
            <VerificationForm
              onVerify={handleVerify}
              onResendCode={resendVerificationCode}
              error={error}
              loading={loading}
            />
          </CardContent>
        </AuthCard>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 lg:px-8">
      <AuthCard
        title="Sign Up"
        description="Welcome! Please enter your details to create an account"
      >
        <CardContent className="space-y-4">
          <AuthOAuthButton provider="google" onClick={handleGoogleSignUp} />

          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-300" />
            <span className="relative bg-white dark:bg-gray-950 px-2 text-sm text-gray-500">
              or continue with
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthFormField
              id="username"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <AuthFormField
              id="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
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
              {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" /> : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <AuthLink
            text="Already have an account?"
            linkText="Sign In"
            href="/sign-in"
          />
        </CardFooter>
      </AuthCard>
    </main>
  );
}
