import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoomInput from "@/components/dashboard/room-input";
import ChartData from "@/components/dashboard/chartData";

import Link from "next/link";

export default function SectionCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Experience Overview</CardTitle>
          <CardDescription>Your language learning progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RoomInput />
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="gap-4 grid">
                <div className="rounded-lg border p-4">
                  <div className="text-xs mb-1">Total Points</div>
                  <div className="text-2xl font-bold">3,000</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-xs mb-1">Speaking Points</div>
                  <div className="text-2xl font-bold mb-2">2,000</div>
                  <Link href="/dashboard/learning">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 w-fit">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
                <div className="rounded-lg border p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs mb-1">ListeningPoints</div>
                    <div className="text-2xl font-bold mb-2">2,450</div>
                  </div>
                  <Link href="/dashboard/learning">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 w-fit">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-xs mb-1">Pronunciation</div>
                <div className="text-2xl font-bold">87% accuracy</div>
                <ChartData />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
