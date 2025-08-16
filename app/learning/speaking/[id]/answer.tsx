"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  prompt: string;
  currentId: number;
  nextId: number | null;
};

export default function SpeechRecorder({ prompt, currentId, nextId }: Props) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [transcript, setTranscript] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const router = useRouter();

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Media devices are not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];

      mr.ondataavailable = async (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);

          const formData = new FormData();
          formData.append("audio", e.data, "chunk.webm");

          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();

          if (data.text) {
            setTranscript((prev) => [...prev, data.text]);
          }
        }
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        // stop all tracks to free microphone
        stream.getTracks().forEach((t) => t.stop());
      };

      mr.start(3000); // send chunks every 3 seconds
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
    <div className="p-4 bg-white rounded shadow w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
            {" "}
            🇺🇸
          </div>
          <div>
            <p className="text-sm font-medium">English Lessons</p>
            <p className="text-xs text-gray-500">Beginner</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">300</div>
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
            {" "}
            🏅
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: "50%" }}
        ></div>
      </div>

      <p className="font-medium mb-2">Speak this sentence</p>
      <div className="italic mb-4">{prompt}</div>

      <div className="flex justify-center mb-4">
        <button
          onClick={startRecording}
          disabled={recording}
          className={`px-4 py-2 rounded-full text-white ${
            recording ? "bg-red-600" : "bg-blue-600"
          } disabled:opacity-50`}
        >
          {recording ? "🎙️ Recording..." : "🎤 Tap to Speak"}
        </button>
        {recording && (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-gray-600 text-white rounded-full ml-2"
          >
            Stop Recording
          </button>
        )}
      </div>

      {audioURL && (
        <div className="mb-4">
          <audio src={audioURL} controls className="w-full" />
        </div>
      )}

      <div className="flex gap-2">
        {nextId && (
          <button
            onClick={() => router.push(`/learning/speaking/${nextId}`)}
            className="px-3 py-1 bg-gray-600 text-white rounded"
          >
            Next
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </div>

      <div className="bg-gray-900 text-white p-4 rounded w-full max-w-xl h-64 overflow-y-auto mt-4">
        {transcript.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {score !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          Your score is: <span className="font-bold">{score}/100</span>
        </div>
      )}
    </div>
  );
}
