import Link from "next/link";
import { GraduationCap, Mic, Book, ChevronRight } from "lucide-react";
import { getNextUnansweredQuestion } from "@/actions/learn-action";
import { getUserFromCookie } from "@/lib/auth";
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

export default async function Learning() {
  const user = getUserFromCookie();
  const listeningQuestion = await getNextUnansweredQuestion(
    Number(user?.id),
    "listening"
  );
  const speakingQuestion = await getNextUnansweredQuestion(
    Number(user?.id),
    "speaking"
  );

  return (
    <main>
      {/* Points Summary */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-indigo-500">Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 mr-3 text-indigo-500" />
              <div className="text-3xl font-bold text-indigo-500">2,450</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-indigo-500">Speaking Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mic className="h-8 w-8  mr-3 text-indigo-500" />
              <div className="text-3xl font-bold text-indigo-500">1,280</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-indigo-500">Listening Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Book className="h-8 w-8  mr-3 text-indigo-500" />
              <div className="text-3xl font-bold text-indigo-500">1,170</div>
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
                  {speakingQuestion?.difficulty === "Easy" && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 dark:bg-zinc-800 border-green-500 text-green-500"
                    >
                      {speakingQuestion?.difficulty}
                    </Badge>
                  )}
                  {speakingQuestion?.difficulty === "Medium" && (
                    <Badge
                      variant="outline"
                      className="bg-orange-100 dark:bg-zinc-800 border-orange-500 text-orange-500"
                    >
                      {speakingQuestion?.difficulty}
                    </Badge>
                  )}
                  {speakingQuestion?.difficulty === "Hard" && (
                    <Badge
                      variant="outline"
                      className="bg-red-100 dark:bg-zinc-800 border-red-500 text-red-500"
                    >
                      {speakingQuestion?.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <Link href={`/learning/speaking/${speakingQuestion?.id}`}>
                  <Button
                    size="sm"
                    className="bg-indigo-500 hover:bg-indigo-400"
                  >
                    Start Practice
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium ">Listening Test</div>
                  <div className="text-sm  mt-1">Test Description</div>
                </div>
                <div>
                  {speakingQuestion?.difficulty === "Easy" && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 dark:bg-zinc-800 border-green-500 text-green-500"
                    >
                      {speakingQuestion?.difficulty}
                    </Badge>
                  )}
                  {speakingQuestion?.difficulty === "Medium" && (
                    <Badge
                      variant="outline"
                      className="bg-orange-100 dark:bg-zinc-800 border-orange-500 text-orange-500"
                    >
                      {speakingQuestion?.difficulty}
                    </Badge>
                  )}
                  {speakingQuestion?.difficulty === "Hard" && (
                    <Badge
                      variant="outline"
                      className="bg-red-100 dark:bg-zinc-800 border-red-500 text-red-500"
                    >
                      {speakingQuestion?.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <Link href={`/learning/listening/${listeningQuestion?.id}`}>
                  <Button
                    size="sm"
                    className="bg-indigo-500 hover:bg-indigo-400"
                  >
                    Start Practice
                  </Button>
                </Link>
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
            className="w-full text-indigo-500 hover:text-indigo-500 hover:bg-indigo-100/50 dark:hover:bg-indigo-800/50"
          >
            <Link href="">View Complete History</Link>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
