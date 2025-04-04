"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Answer({ question }: { question: string }) {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkAnswer = () => {
    setIsLoading(true);
    if (question === answer) {
      alert("Correct answer!");
    } else {
      alert("Wrong answer. Try again!");
    }
    setIsLoading(false);
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
    </div>
  );
}
