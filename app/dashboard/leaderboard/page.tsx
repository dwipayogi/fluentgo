import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, User } from "lucide-react";
import {
  getTopUsersByTotal,
  getTopUsersBySpeaking,
  getTopUsersByListening,
} from "@/actions/user-actions";

export const revalidate = 3600;

export default async function Leaderboard() {
  const totalTopUsers = await getTopUsersByTotal();
  const speakingTopUsers = await getTopUsersBySpeaking();
  const listeningTopUsers = await getTopUsersByListening();

  return (
    <main>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold ">Language Learning Champions</h2>
          <p className="">See how you rank against other learners</p>
        </div>
      </div>

      <Card className="">
        <CardHeader>
          <CardTitle className="">Leaderboards</CardTitle>
          <CardDescription className="">
            Compare your progress with other Spanish learners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="total" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-indigo-400 dark:bg-indigo-600">
              <TabsTrigger value="total">Total Points</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
              <TabsTrigger value="listening">Listening</TabsTrigger>
            </TabsList>

            {/* Total Points Leaderboard */}
            <TabsContent value="total" className="mt-4">
              <div className="space-y-4">
                {totalTopUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 4
                        ? "bg-zinc-200/30 dark:bg-zinc-700/30"
                        : "bg-zinc-100/50 dark:bg-zinc-800/50"
                    } border border-zinc-200 dark:border-zinc-700`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                          index === 0
                            ? "bg-yellow-500/20 text-yellow-500"
                            : index === 1
                            ? "bg-zinc-300/20 dark:bg-zinc-500/20"
                            : index === 2
                            ? "bg-amber-700/20 text-amber-700 dark:text-amber-500"
                            : ""
                        }`}
                      >
                        {index === 0 ? (
                          <Crown className="h-4 w-4" />
                        ) : (
                          <div className="text-sm font-bold">{index + 1}</div>
                        )}
                      </div>
                      <div className="mr-4 text-lg font-bold ">{index + 1}</div>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                        </div>
                        <div>
                          <div className="font-medium text-lg">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold ">
                      {user.speaking_point + user.listening_point}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Speaking Points Leaderboard */}
            <TabsContent value="speaking" className="mt-4">
              <div className="space-y-4">
                {speakingTopUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 4
                        ? "bg-zinc-200/30 dark:bg-zinc-700/30"
                        : "bg-zinc-100/50 dark:bg-zinc-800/50"
                    } border border-zinc-200 dark:border-zinc-700`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                          index === 0
                            ? "bg-yellow-500/20 text-yellow-500"
                            : index === 1
                            ? "bg-zinc-300/20 dark:bg-zinc-500/20"
                            : index === 2
                            ? "bg-amber-700/20 text-amber-700 dark:text-amber-500"
                            : ""
                        }`}
                      >
                        {index === 0 ? (
                          <Crown className="h-4 w-4" />
                        ) : (
                          <div className="text-sm font-bold">{index + 1}</div>
                        )}
                      </div>
                      <div className="mr-4 text-lg font-bold ">{index + 1}</div>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                        </div>
                        <div>
                          <div className="font-medium text-lg">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold ">
                      {user.speaking_point}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Listening Points Leaderboard */}
            <TabsContent value="listening" className="mt-4">
              <div className="space-y-4">
                {listeningTopUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 4
                        ? "bg-zinc-200/30 dark:bg-zinc-700/30"
                        : "bg-zinc-100/50 dark:bg-zinc-800/50"
                    } border border-zinc-200 dark:border-zinc-700`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                          index === 0
                            ? "bg-yellow-500/20 text-yellow-500"
                            : index === 1
                            ? "bg-zinc-300/20 dark:bg-zinc-500/20"
                            : index === 2
                            ? "bg-amber-700/20 text-amber-700 dark:text-amber-500"
                            : ""
                        }`}
                      >
                        {index === 0 ? (
                          <Crown className="h-4 w-4" />
                        ) : (
                          <div className="text-sm font-bold">{index + 1}</div>
                        )}
                      </div>
                      <div className="mr-4 text-lg font-bold ">{index + 1}</div>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                        </div>
                        <div>
                          <div className="font-medium text-lg">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold ">
                      {user.listening_point}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
