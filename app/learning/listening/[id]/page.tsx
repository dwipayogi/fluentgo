"use client"
import { useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ListeningPage() {
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="flex items-center justify-center flex-col">
      <h2 className="text-2xl font-bold">Listening Practice</h2>
      <p>Answer the questions to improve your listening skills.</p>
      <div className="flex flex-col items-center mt-5">
        <AudioVisualizer />
        <div className="mt-5">
          <Input
            type="text"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-80"
          />
          <Button
            onClick={() => {
              setIsLoading(true);
              // Simulate an API call to check the answer
              setTimeout(() => {
                // setIsCorrect(answer === question.answer);
                setIsLoading(false);
              }, 2000);
            }}
            disabled={isLoading}
            className="mt-3"
          >
            {isLoading ? "Checking..." : "Submit"}
          </Button>
          {isCorrect && <p className="text-green-500">Correct!</p>}
        </div>
      </div>
    </main>
  )
}