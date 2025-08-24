"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AudioVisualizer from "@/components/AudioVisualizer";
import { updateUserListeningPoints } from "@/actions/user-actions";
import { saveUserAnswer } from "@/actions/learn-action";

type Props = {
  question: string;
  currentId: number;
  nextId: number | null;
  audioPath: string;
  difficulty?: string;
  totalQuestions: number;
  position: number;
  user_id: string | null;
  questionId: number; // Add question ID for database
};

export default function ListeningQuiz({
  question,
  currentId,
  nextId,
  audioPath,
  difficulty = "Easy",
  totalQuestions,
  position,
  user_id,
  questionId,
}: Props) {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const router = useRouter();

  // derive difficulty and badge classes from props
  const difficultyClass =
    difficulty === "Easy"
      ? "bg-green-100 text-green-800 border-green-200"
      : difficulty === "Medium"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-red-100 text-red-800 border-red-200";

  const total = Math.max(1, totalQuestions);
  const progress = Math.round(((position + 1) / total) * 100);

  const calculateScore = (
    userAnswer: string,
    correctAnswer: string
  ): number => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      return 100;
    }

    // Calculate similarity based on word matching
    const userWords = normalizedUserAnswer.split(/\s+/);
    const correctWords = normalizedCorrectAnswer.split(/\s+/);

    const matchingWords = userWords.filter((word) =>
      correctWords.includes(word)
    ).length;

    return Math.round((matchingWords / correctWords.length) * 100);
  };

  const dateNow = new Date();

  const handleSubmit = async () => {
    const calculatedScore = calculateScore(answer, question);
    setScore(calculatedScore);
    setShowResult(true);

    // Save individual answer to database
    if (user_id && questionId) {
      try {
        await saveUserAnswer(
          parseInt(user_id),
          questionId,
          calculatedScore,
          calculatedScore // using score as points for now
        );
        console.log("Listening answer saved successfully");
      } catch (error) {
        console.error("Error saving listening answer:", error);
      }
    }

    // Save score to localStorage for accumulation
    const currentTotal = parseInt(
      localStorage.getItem("totalListeningScore") || "0"
    );
    const newTotal = currentTotal + calculatedScore;
    localStorage.setItem("totalListeningScore", newTotal.toString());
  };

  const saveFinalkScoreToServer = async () => {
    if (!user_id) return;

    const totalScore = parseInt(
      localStorage.getItem("totalListeningScore") || "0"
    );

    if (totalScore > 0) {
      try {
        await updateUserListeningPoints(parseInt(user_id), totalScore, dateNow);
        console.log("Total listening score saved successfully:", totalScore);
        // Clear localStorage after successful save
        localStorage.removeItem("totalListeningScore");
      } catch (error) {
        console.error("Error saving total listening score to server:", error);
      }
    }
  };

  const handleExit = async () => {
    await saveFinalkScoreToServer();
    router.push("/dashboard");
  };

  const handleNext = () => {
    if (nextId) {
      router.push(`/learning/listening/${nextId}`);
    } else {
      // Save total score when finishing all questions
      saveFinalkScoreToServer();
      router.push("/dashboard/learning");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 space-y-4 dark:bg-gray-900/80 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl shadow-md">
            🎧
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Listen & Learn
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Beginner English
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-yellow-100/80 border border-yellow-300 rounded-full px-3 py-1 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300">
            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-300">
              300
            </span>
            <span className="text-2xl">🏅</span>
          </div>
          <Dialog open={showExitModal} onOpenChange={setShowExitModal}>
            <DialogTrigger asChild>
              <button className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md">
                <X size={20} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Exit Quiz?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to exit the quiz? Your progress will be
                  saved and you will return to the dashboard.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExit}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Yes, Exit
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="text-center bg-gray-50 rounded-xl p-4 dark:bg-gray-800/60 dark:border dark:border-gray-700">
        <p className="text-sm font-medium text-gray-600 mb-1 dark:text-gray-300">
          Listen to the audio and type what you hear
        </p>
        <div className="my-3">
          <Badge className={`${difficultyClass} dark:border-none`}>
            {difficulty}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 py-4">
        <AudioVisualizer audioPath={audioPath} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Your answer:
          </label>
          <input
            type="text"
            placeholder="Type what you heard..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 border-2 border-indigo-200 rounded-lg text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none dark:bg-gray-800 dark:border-indigo-700 dark:text-gray-100 dark:placeholder-gray-500"
            disabled={showResult}
          />
        </div>

        {showResult && (
          <div className="space-y-4">
            <div className="bg-gray-50/80 p-4 rounded-xl border dark:bg-gray-800/60 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 mb-2 text-base dark:text-gray-100">
                Correct answer:
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{question}</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-400 rounded-2xl shadow-md dark:from-green-900 dark:to-teal-900 dark:border-green-700">
              <p className="text-base text-gray-700 dark:text-gray-200">
                Your score is
              </p>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600">
                {score}
                <span className="text-2xl text-gray-500 dark:text-gray-300">
                  /100
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSubmit}
          disabled={answer.trim() === "" || showResult}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-semibold hover:from-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer dark:bg-gradient-to-r dark:from-green-600 dark:to-teal-600"
        >
          Check Answer
        </button>
        <button
          onClick={async () => {
            if (!showResult) return; // guard if somehow clicked
            if (nextId) {
              router.push(`/learning/listening/${nextId}`);
            } else {
              // Save total score when finishing all questions
              await saveFinalkScoreToServer();
              router.push(`/dashboard/learning`);
            }
          }}
          disabled={!showResult}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer dark:bg-indigo-600 ${
            !showResult
              ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:shadow-none"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          {nextId ? "Next →" : "Finish"}
        </button>
      </div>
    </div>
  );
}
