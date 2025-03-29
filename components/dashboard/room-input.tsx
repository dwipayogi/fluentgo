"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { createRoom, joinRoom } from "@/actions/room-actions";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Room } from "@/lib/types";

const initialFormData = {
  id: 0,
  user_id: 0,
  name: "",
  description: "",
  password: "",
  started_at: new Date(),
  ended_at: new Date(),
}
export default function RoomInput() {
  const { user } = useUser();
  const [formData, setFormData] = useState<Room>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMeeting = async () => {
    try {
      setIsLoading(true);
      const data = {
        ...formData,
        user_id: Number(user?.id),
        created_at: new Date(),
        started_at: new Date(formData.started_at),
        ended_at: new Date(formData.ended_at),
      };
      await createRoom(data);
    } catch (error) {
      console.error("Error creating meeting:", error);
    } finally {
      setFormData(initialFormData);
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    setIsLoading(true);
    try {
      const data = {
        name: formData.name,
        password: formData.password,
      };
      await joinRoom(data.name, data.password);
    } catch (error) {
      console.error("Error joining room:", error);
    } finally {
      setFormData(initialFormData);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-indigo-500 hover:bg-indigo-400">
            Create Meeting
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-indigo-500">
          <DialogHeader>
            <DialogTitle>Create New Meeting</DialogTitle>
            <DialogDescription>
              Enter the details for your new meeting. Click create when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Room Name
              </Label>
              <Input id="name" className="col-span-3" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" className="col-span-3" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" className="col-span-3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start Time
              </Label>
              <Input id="start" type="datetime-local" className="col-span-3" value={formData.started_at.toISOString().slice(0, 16)} onChange={(e) => setFormData({ ...formData, started_at: new Date(e.target.value) })} required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End Time
              </Label>
              <Input id="end" type="datetime-local" className="col-span-3" value={formData.ended_at.toISOString().slice(0, 16)} onChange={(e) => setFormData({ ...formData, ended_at: new Date(e.target.value) })} required />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleCreateMeeting}
              className="bg-indigo-500 hover:bg-indigo-400"
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <span className="text-sm text-slate-400">or</span>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-indigo-500 hover:bg-indigo-400"
          >
            Join Meeting
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-indigo-500">
          <DialogHeader>
            <DialogTitle>Join Meeting</DialogTitle>
            <DialogDescription>
              Enter the details for your existing meeting. Click join when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Room Name
              </Label>
              <Input id="name" className="col-span-3" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" className="col-span-3" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleJoinRoom}
              className="bg-indigo-500 hover:bg-indigo-400"
            >
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
