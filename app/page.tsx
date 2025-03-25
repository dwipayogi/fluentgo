"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { generateRoomId } from "@/lib/client-utils";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const startMeeting = () => {
    router.push(`/rooms/${generateRoomId()}`);
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Connect with anyone, anywhere
      </h1>
      <p className="my-6 text-lg text-gray-600 max-w-3xl text-center">
        Our video conferencing platform makes it easy to connect with
        colleagues, friends, and family from anywhere in the world. No account
        required.
      </p>

      <Button
        onClick={startMeeting}
        className="cursor-pointer"
      >
        Start Meeting
      </Button>
    </main>
  );
}
