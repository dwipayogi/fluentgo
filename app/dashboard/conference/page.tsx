"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";

export default function ConferencePage() {
  return (
    <main>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Meeting</h2>
          <p>Join your scheduled language sessions</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Spanish Intermediate</CardTitle>
            <CardDescription>with Maria (Native Speaker)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Today</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>3:00 PM - 3:45 PM</span>
              </div>
              <div className="text-sm  mt-2">
                <p>
                  Focus: Conversation practice with emphasis on past tense verbs
                </p>
              </div>
              <Button className="w-full bg-indigo-500 hover:bg-indigo-400">
                <Link href="/dashboard/conference/join">Join Class</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pronunciation Workshop</CardTitle>
            <CardDescription>with Carlos (Native Speaker)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Today</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>5:30 PM - 6:15 PM</span>
              </div>
              <div className="text-sm  mt-2">
                <p>
                  Focus: Mastering the Spanish 'r' sound and difficult
                  consonants
                </p>
              </div>
              <Button className="w-full bg-indigo-500 hover:bg-indigo-400">
                <Link href="/dashboard/conference/join">Join Class</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Find More Classes Card */}
        <Card className=" flex flex-col justify-center items-center p-6">
          <div className="rounded-full border p-4">
            <Video className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium">Create New Meeting</h3>
          <p className=" text-center">
            Create a new meeting for your language practice sessions.
          </p>
          <Button className="text-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 border-indigo-500 dark:border-indigo-500 dark:bg-zinc-900 w-full" variant="outline">
            <Link href="/rooms/uaisbf-asdbiuas">Find Class</Link>
          </Button>
        </Card>
      </div>
    </main>
  );
}
