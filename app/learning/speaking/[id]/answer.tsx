"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  prompt: string;
  currentNumber: number;
  nextNumber: number | null;
  difficulty: string;
  totalQuestions: number;
  position: number; // zero-based position
};

export default function SpeechRecorder({
  prompt,
  currentNumber,
  nextNumber,
  difficulty,
  totalQuestions,
  position,
}: Props) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [transcript, setTranscript] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const router = useRouter();

  // derive difficulty and badge classes from props
  const difficultyLabel = difficulty ?? "Easy";
  const difficultyClass =
    difficultyLabel === "Easy"
      ? "bg-green-100 text-green-800 border-green-200"
      : difficultyLabel === "Medium"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-red-100 text-red-800 border-red-200";

  const total = Math.max(1, totalQuestions);
  const progress = Math.round(((position + 1) / total) * 100);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Media devices are not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);

        const formData = new FormData();
        formData.append("audio", blob, "recording.webm");

        try {
          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();

          if (data.text) {
            setTranscript([data.text]);
          }
        } catch (err) {
          console.error("Error during transcription:", err);
          alert("Transcription failed.");
        }

        // stop all tracks to free microphone
        stream.getTracks().forEach((t) => t.stop());
      };

      mr.start();
      setMediaRecorder(mr);
      setRecording(true);
    } catch (err) {
      console.error(err);
      alert("Could not start recording.");
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
    setMediaRecorder(null);
  };

  const calculateScore = (transcript: string[], answer: string): number => {
    const transcriptText = transcript.join(" ").toLowerCase();
    const answerText = answer.toLowerCase();

    const transcriptWords = transcriptText.split(/\s+/);
    const answerWords = answerText.split(/\s+/);

    const correctWords = transcriptWords.filter((word) =>
      answerWords.includes(word)
    ).length;
    const totalWords = answerWords.length;

    return Math.min(100, Math.round((correctWords / totalWords) * 100));
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore(transcript, prompt);
    setScore(calculatedScore);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl shadow-md">
            🇺🇸
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Speak & Learn</h1>
            <p className="text-sm text-gray-500">Beginner English</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100/80 border border-yellow-300 rounded-full px-3 py-1">
          <span className="text-lg font-bold text-yellow-600">300</span>
          <span className="text-2xl">🏅</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="text-center bg-gray-50 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-600 mb-1">
          Speak this sentence aloud
        </p>
        <div className="my-3">
          <Badge className={difficultyClass}>{difficultyLabel}</Badge>
        </div>
        <p className="text-2xl font-semibold text-indigo-600">
          &quot;{prompt}&quot;
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3 py-4">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ease-in-out
          ${
            recording
              ? "bg-gradient-to-br from-red-500 to-orange-500 shadow-lg cursor-pointer"
              : "bg-indigo-500 shadow-lg cursor-pointer"
          }
          text-white focus:outline-none focus:ring-4 focus:ring-blue-300/50 disabled:opacity-60`}
        >
          {recording && (
            <span className="absolute h-full w-full rounded-full bg-red-400 animate-ping opacity-75"></span>
          )}
          <Mic size={32} />
        </button>
        <p className="text-gray-600 font-medium text-base">
          {recording ? "Recording..." : "Tap to Speak"}
        </p>
      </div>

      {(audioURL || transcript.length > 0) && (
        <div className="space-y-4 bg-gray-50/80 p-4 rounded-xl border">
          {audioURL && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-base">
                Your recording:
              </h3>
              <audio src={audioURL} controls className="w-full" />
            </div>
          )}

          {transcript.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-base">
                What we heard:
              </h3>
              <div className="bg-white text-gray-800 p-3 rounded-lg w-full min-h-[4rem] overflow-y-auto border-2 border-indigo-200">
                {transcript.map((line, i) => (
                  <p key={i} className="text-base">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {score !== null && (
        <div className="text-center p-4 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-400 rounded-2xl shadow-md">
          <p className="text-base text-gray-700">Your score is</p>
          <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600">
            {score}
            <span className="text-2xl text-gray-500">/100</span>
          </p>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={transcript.length === 0 || score !== null}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-semibold hover:from-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          Check Score
        </button>
        <button
          onClick={() => {
            if (nextNumber) {
              router.push(`/learning/speaking/${nextNumber}`);
            } else {
              router.push(`/dashboard/learning`);
            }
          }}
          className="px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          {nextNumber ? "Next →" : "Finish"}
        </button>
      </div>
    </div>
  );
}
