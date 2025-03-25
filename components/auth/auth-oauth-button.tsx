"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface AuthOAuthButtonProps {
  provider: "google";
  onClick: () => Promise<void>;
}

export function AuthOAuthButton({ provider, onClick }: AuthOAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  const providerIcons = {
    google: "/google.svg",
  };

  const providerNames = {
    google: "Google",
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick();
    } catch (error) {
      console.error(`${provider} auth error:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={loading}
      onClick={handleClick}
      className="w-full flex items-center gap-2"
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
      ) : (
        <Image
          src={providerIcons[provider]}
          alt={providerNames[provider]}
          width={20}
          height={20}
        />
      )}
      Continue with {providerNames[provider]}
    </Button>
  );
}
