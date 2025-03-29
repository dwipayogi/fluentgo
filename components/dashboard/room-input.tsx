"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";

export default function RoomInput() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleCreateMeeting = async () => {
    try {
      const res = await fetch("/api/meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName }),
      });

      if (!res.ok) {
        throw new Error("Failed to create meeting");
      }

      const data = await res.json();
      router.push(`/meeting/${data.roomId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button onClick={handleCreateMeeting} className="bg-indigo-500 hover:bg-indigo-400">Create Meeting</Button>
      <span className="text-sm text-slate-400">or</span>
      <Input placeholder="Enter room name" value={roomName} onChange={handleInputChange} />
    </div>
  )
}