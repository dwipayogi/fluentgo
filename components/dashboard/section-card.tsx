import { getUserPoint } from "@/actions/user-actions";
import { getUserFromCookie } from "@/lib/auth";

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
import AccuracySummary from "@/components/dashboard/accuracy-summary";
import Link from "next/link";

export default async function SectionCards() {
  const user = getUserFromCookie();
  const userData = await getUserPoint(Number(user?.id!));
  const speakingPoints = userData.speaking_point;
  const listeningPoints = userData.listening_point;
  const totalPoints = speakingPoints + listeningPoints;

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
                  <div className="text-2xl font-bold">{totalPoints}</div>
                </div>
                <div className="rounded-lg border p-4 flex flex-col justify-between">
                  <div className="text-xs mb-1">Speaking Points</div>
                  <div className="text-2xl font-bold mb-2">
                    {speakingPoints}
                  </div>
                  <Link href="/dashboard/learning">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 w-fit">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
                <div className="rounded-lg border p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs mb-1">Listening Points</div>
                    <div className="text-2xl font-bold mb-2">
                      {listeningPoints}
                    </div>
                  </div>
                  <Link href="/dashboard/learning">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 w-fit">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-xs mb-1">Learning Progress</div>
                <AccuracySummary userId={Number(user?.id)} />
                <div className="mt-3">
                  <ChartData userId={Number(user?.id)} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
