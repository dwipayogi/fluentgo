import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SectionCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Experience Overview</CardTitle>
          <CardDescription>Your language learning progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="text-xs  mb-1">Total Points</div>
                <div className="text-2xl font-bold ">3,000</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-xs  mb-1">Listening Points</div>
                <div className="text-2xl font-bold ">2,450</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-xs  mb-1">Speaking Points</div>
                <div className="text-2xl font-bold ">2,000</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-xs  mb-1">Pronunciation</div>
                <div className="text-2xl font-bold ">87% accuracy</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
