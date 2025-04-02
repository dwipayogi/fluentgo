import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { getRooms, joinRoom } from "@/actions/room-actions";
import CreateMeet from "@/components/conference/create-meet";

export default async function ConferencePage() {
  const rooms = await getRooms();

  async function handleJoinRoom({
    name,
    password,
  }: {
    name: string;
    password: string;
  }) {
    await joinRoom(name, password);
  }

  return (
    <main>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Meeting</h2>
          <p>Join your scheduled language sessions</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Render rooms from database */}
        {rooms.map((room) => {
          // Format dates for display
          const startDate = new Date(room.started_at);
          const endDate = new Date(room.ended_at);
          const isToday =
            startDate.toDateString() === new Date().toDateString();

          const formatTime = (date: Date) => {
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          };

          return (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.creator_name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {isToday ? "Today" : startDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>
                      {formatTime(startDate)} - {formatTime(endDate)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span>Focus: {room.description}</span>
                  </div>
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-400">
                    Join Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Create New Meeting Card */}
        <CreateMeet />
      </div>
    </main>
  );
}
