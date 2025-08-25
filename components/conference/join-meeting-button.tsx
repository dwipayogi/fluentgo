"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { joinRoom } from "@/actions/room-actions";

interface JoinMeetingButtonProps {
  roomName: string;
  hasPassword?: boolean;
}

export default function JoinMeetingButton({ roomName, hasPassword = false }: JoinMeetingButtonProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleJoinRoom = async () => {
    try {
      setIsLoading(true);
      setError("");
      await joinRoom(roomName, hasPassword ? password : undefined);
      setIsOpen(false);
    } catch (error) {
      console.error("Error joining room:", error);
      setError(error instanceof Error ? error.message : "Failed to join room");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectJoin = async () => {
    if (!hasPassword) {
      await handleJoinRoom();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Button 
        className="w-full bg-indigo-500 hover:bg-indigo-400"
        onClick={handleDirectJoin}
        disabled={isLoading}
      >
        {isLoading ? "Joining..." : "Join Meeting"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Meeting</DialogTitle>
            <DialogDescription>
              Enter the password to join "{roomName}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                placeholder="Enter room password"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handleJoinRoom}
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
