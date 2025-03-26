import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, User } from "lucide-react";

export default function Leaderboard() {
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="total">Total Points</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
              <TabsTrigger value="listening">Listening</TabsTrigger>
            </TabsList>

            {/* Total Points Leaderboard */}
            <TabsContent value="total" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 mr-4">
                      <Crown className="h-4 w-4" />
                    </div>
                    <div className="mr-4 text-lg font-bold ">1</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Miguel Fernandez</div>
                        <div className="text-xs ">Level 5 • 14 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">3,245</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-300/20 dark:bg-zinc-500/20  mr-4">
                      <div className="text-sm font-bold">2</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">2</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Sophia Chen</div>
                        <div className="text-xs ">Level 4 • 21 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,890</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-500 mr-4">
                      <div className="text-sm font-bold">3</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">3</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">David Kim</div>
                        <div className="text-xs ">Level 4 • 8 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,745</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4">
                      <div className="text-sm font-bold">4</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">4</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Emma Rodriguez</div>
                        <div className="text-xs ">Level 3 • 5 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,580</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-200/30 dark:bg-zinc-700/30 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4">
                      <div className="text-sm font-bold">5</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">5</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Sarah Johnson</div>
                        <div className="text-xs ">Level 3 • 14 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,450</div>
                </div>
              </div>
            </TabsContent>

            {/* Speaking Points Leaderboard */}
            <TabsContent value="speaking" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 mr-4">
                      <Crown className="h-4 w-4" />
                    </div>
                    <div className="mr-4 text-lg font-bold ">1</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Sophia Chen</div>
                        <div className="text-xs ">Level 4 • 21 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,890</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-300/20 dark:bg-zinc-500/20  mr-4">
                      <div className="text-sm font-bold">2</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">2</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Miguel Fernandez</div>
                        <div className="text-xs ">Level 5 • 14 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">3,245</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-500 mr-4">
                      <div className="text-sm font-bold">3</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">3</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">David Kim</div>
                        <div className="text-xs ">Level 4 • 8 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,745</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4">
                      <div className="text-sm font-bold">4</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">4</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Emma Rodriguez</div>
                        <div className="text-xs ">Level 3 • 5 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,580</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-200/30 dark:bg-zinc-700/30 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4">
                      <div className="text-sm font-bold">5</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">5</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Sarah Johnson</div>
                        <div className="text-xs ">Level 3 • 14 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,450</div>
                </div>
              </div>
            </TabsContent>

            {/* Listening Points Leaderboard */}
            <TabsContent value="listening" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 mr-4">
                      <Crown className="h-4 w-4" />
                    </div>
                    <div className="mr-4 text-lg font-bold ">1</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Miguel Fernandez</div>
                        <div className="text-xs ">Level 5 • 14 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">3,245</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-300/20 dark:bg-zinc-500/20  mr-4">
                      <div className="text-sm font-bold">2</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">2</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Sophia Chen</div>
                        <div className="text-xs ">Level 4 • 21 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,890</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-500 mr-4">
                      <div className="text-sm font-bold">3</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">3</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">David Kim</div>
                        <div className="text-xs ">Level 4 • 8 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,745</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4">
                      <div className="text-sm font-bold">4</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">4</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Emma Rodriguez</div>
                        <div className="text-xs ">Level 3 • 5 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,580</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-200/30 dark:bg-zinc-700/30 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4">
                      <div className="text-sm font-bold">5</div>
                    </div>
                    <div className="mr-4 text-lg font-bold ">5</div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                      </div>
                      <div>
                        <div className="font-medium ">Sarah Johnson</div>
                        <div className="text-xs ">Level 3 • 14 day streak</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold ">2,450</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
