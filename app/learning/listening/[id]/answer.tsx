"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Answer({
  question,
  currentId,
  nextId,
}: {
  question: string;
  currentId: number;
  nextId: number | null;
}) {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState<{
    title: string;
    description: string;
    type: "success" | "error";
  } | null>(null);

  const router = useRouter();

  const checkAnswer = () => {
    setIsLoading(true);
    const normalizedQuestion = question.trim().toLowerCase();
    const normalizedAnswer = answer.trim().toLowerCase();

    if (normalizedQuestion === normalizedAnswer) {
      setDialogData({
        title: "Correct",
        description:
          nextId !== null
            ? "Correct! Move to the next question?"
            : "Correct! You've completed all questions.",
        type: "success",
      });
      setOpen(true);
    } else {
      setDialogData({
        title: "Wrong",
        description: "Wrong answer. Try again!",
        type: "error",
      });
      setOpen(true);
    }

    setIsLoading(false);
  };

  const handleNext = () => {
    setOpen(false);
    if (nextId) {
      router.push(`/learning/listening/${nextId}`);
    }
  };

  return (
    <div className="mt-5 flex flex-col items-center w-full">
      <Input
        type="text"
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full"
      />
      <Button
        onClick={checkAnswer}
        disabled={isLoading}
        className="mt-3 bg-indigo-500 hover:bg-indigo-400"
      >
        {isLoading ? "Checking..." : "Submit"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>{dialogData?.title}</DialogTitle>
          <DialogDescription>{dialogData?.description}</DialogDescription>
          <DialogFooter>
            {dialogData?.type === "success" && nextId !== null ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={() => setOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
