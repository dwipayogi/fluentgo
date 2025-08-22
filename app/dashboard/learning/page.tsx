import Link from "next/link";
import {
  GraduationCap,
  Mic,
  Book,
  ChevronRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  getNextUnansweredQuestion,
  getUserQuestionHistory,
} from "@/actions/learn-action";
import { getUserFromCookie } from "@/lib/auth";
import { getUserPoint } from "@/actions/user-actions";
import { listeningQuestion } from "@/data/listening";
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
  const speakingQuestion = await getNextUnansweredQuestion(
    Number(user?.id),
    "speaking"
  );

  // Get first listening question from data file
  const firstListeningQuestion = listeningQuestion[0];

  const userData = await getUserPoint(Number(user?.id));
  const speakingPoints = userData?.speaking_point ?? 0;
  const listeningPoints = userData?.listening_point ?? 0;
  const totalPoints = speakingPoints + listeningPoints;

  // Get user's question history
  const questionHistory = await getUserQuestionHistory(Number(user?.id), 5);

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
              <div className="text-3xl font-bold text-indigo-500">
                {totalPoints}
              </div>
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
              <div className="text-3xl font-bold text-indigo-500">
                {speakingPoints}
              </div>
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
              <div className="text-3xl font-bold text-indigo-500">
                {listeningPoints}
              </div>
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
                {speakingQuestion ? (
                  <Link href={`/learning/speaking/${speakingQuestion.number}`}>
                    <Button
                      size="sm"
                      className="bg-indigo-500 hover:bg-indigo-400"
                    >
                      Start Practice
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" disabled className="opacity-50">
                    No Questions
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium ">Listening Test</div>
                  <div className="text-sm  mt-1">Test Description</div>
                </div>
                <div>
                  {firstListeningQuestion?.difficulty === "Easy" && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 dark:bg-zinc-800 border-green-500 text-green-500"
                    >
                      {firstListeningQuestion?.difficulty}
                    </Badge>
                  )}
                  {firstListeningQuestion?.difficulty === "Medium" && (
                    <Badge
                      variant="outline"
                      className="bg-orange-100 dark:bg-zinc-800 border-orange-500 text-orange-500"
                    >
                      {firstListeningQuestion?.difficulty}
                    </Badge>
                  )}
                  {firstListeningQuestion?.difficulty === "Hard" && (
                    <Badge
                      variant="outline"
                      className="bg-red-100 dark:bg-zinc-800 border-red-500 text-red-500"
                    >
                      {firstListeningQuestion?.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                {firstListeningQuestion ? (
                  <Link
                    href={`/learning/listening/${firstListeningQuestion.id}`}
                  >
                    <Button
                      size="sm"
                      className="bg-indigo-500 hover:bg-indigo-400"
                    >
                      Start Practice
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" disabled className="opacity-50">
                    No Questions
                  </Button>
                )}
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
            {questionHistory.length > 0 ? (
              questionHistory.map((answer) => (
                <div key={answer.id} className="rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-medium capitalize">
                          {answer.category_name} Test
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            answer.difficulty_name === "Easy"
                              ? "bg-green-100 dark:bg-zinc-800 border-green-500 text-green-500"
                              : answer.difficulty_name === "Normal"
                              ? "bg-orange-100 dark:bg-zinc-800 border-orange-500 text-orange-500"
                              : "bg-red-100 dark:bg-zinc-800 border-red-500 text-red-500"
                          }
                        >
                          {answer.difficulty_name}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Question #{answer.number}:{" "}
                        {answer.question_text?.length > 50
                          ? `${answer.question_text.substring(0, 50)}...`
                          : answer.question_text}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">
                          {answer.accuracy}% correct
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        +{answer.point} points
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      Completed{" "}
                      {new Date(answer.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No practice history yet</p>
                <p className="text-sm">
                  Start practicing to see your progress here!
                </p>
              </div>
            )}
          </div>
        </CardContent>
        {questionHistory.length > 0 && (
          <CardFooter>
            <Button
              variant="ghost"
              className="w-full text-indigo-500 hover:text-indigo-500 hover:bg-indigo-100/50 dark:hover:bg-indigo-800/50"
            >
              <Link href="/dashboard/learning/history">
                View Complete History
              </Link>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
