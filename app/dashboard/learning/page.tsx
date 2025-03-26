import Link from "next/link";
import { GraduationCap, Mic, Book, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Learning() {
  return (
    <main>
      {/* Points Summary */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8  mr-3" />
              <div className="text-3xl font-bold ">2,450</div>
            </div>
            <div className="mt-2 text-sm ">
              <span className="text-green-500 dark:text-green-400">+120</span>{" "}
              points this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Speaking Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mic className="h-8 w-8  mr-3" />
              <div className="text-3xl font-bold ">1,280</div>
            </div>
            <div className="mt-2 text-sm ">
              <span className="text-green-500 dark:text-green-400">+75</span>{" "}
              points this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Listening Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Book className="h-8 w-8  mr-3" />
              <div className="text-3xl font-bold ">1,170</div>
            </div>
            <div className="mt-2 text-sm ">
              <span className="text-green-500 dark:text-green-400">+45</span>{" "}
              points this week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Questions To Do */}
      <Card className=" mb-6">
        <CardHeader>
          <CardTitle>Questions To Complete</CardTitle>
          <CardDescription>
            Recommended practice activities based on your learning goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium ">Speaking Test</div>
                  <div className="text-sm  mt-1">Test Description</div>
                </div>
                <div>
                  <Badge variant="outline">Speaking</Badge>
                  <Badge variant="outline">Easy</Badge>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <Button size="sm">
                  <Link href="">Start Practice</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium ">Listening Test</div>
                  <div className="text-sm  mt-1">Test Description</div>
                </div>
                <div>
                  <Badge variant="outline">Listening</Badge>
                  <Badge variant="outline">Hard</Badge>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <Button size="sm">
                  <Link href="">Start Practice</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question History */}
      <Card>
        <CardHeader>
          <CardTitle>Question History</CardTitle>
          <CardDescription>
            Your recently completed practice activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium ">Speaking Test</div>
                  <div className="text-sm  mt-1">Test Description</div>
                </div>
                <div>92% correct</div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-xs">Completed 2 hours ago</div>
                <div className="text-xs">+45 points</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <Link href="">View Complete History</Link>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
