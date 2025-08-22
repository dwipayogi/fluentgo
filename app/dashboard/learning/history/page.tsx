import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle, Book, Mic } from "lucide-react";
import { getUserQuestionHistory } from "@/actions/learn-action";
import { getUserFromCookie } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function LearningHistory() {
  const user = getUserFromCookie();

  // Get all question history (no limit)
  const questionHistory = await getUserQuestionHistory(Number(user?.id), 100);

  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/learning">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Learning History</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete record of your practice activities
          </p>
        </div>
      </div>

      {/* History Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Total Completed</p>
                <p className="text-2xl font-bold">{questionHistory.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Speaking</p>
                <p className="text-2xl font-bold">
                  {
                    questionHistory.filter(
                      (q) => q.category_name === "speaking"
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Book className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Listening</p>
                <p className="text-2xl font-bold">
                  {
                    questionHistory.filter(
                      (q) => q.category_name === "listening"
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Avg. Accuracy</p>
                <p className="text-2xl font-bold">
                  {questionHistory.length > 0
                    ? Math.round(
                        questionHistory.reduce(
                          (sum, q) => sum + q.accuracy,
                          0
                        ) / questionHistory.length
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <Card>
        <CardHeader>
          <CardTitle>Complete History</CardTitle>
          <CardDescription>
            All your completed practice activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questionHistory.length > 0 ? (
              questionHistory.map((answer) => (
                <div
                  key={answer.id}
                  className="rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {answer.category_name === "speaking" ? (
                          <Mic className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Book className="h-4 w-4 text-purple-500" />
                        )}
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
                        <span className="font-medium">
                          Question #{answer.number}:
                        </span>{" "}
                        {answer.question_text}
                      </div>
                    </div>
                    <div className="text-right ml-4">
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
                  <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {new Date(answer.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      Answer ID: {answer.id}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Book className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No history yet</h3>
                <p className="text-sm mb-4">
                  Start practicing to see your progress here!
                </p>
                <Link href="/dashboard/learning">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
