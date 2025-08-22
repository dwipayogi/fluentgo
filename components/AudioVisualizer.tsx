"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface AudioVisualizerProps {
  audioPath: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioPath }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(Array(5).fill(0));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioPath);
    // Removed the loop = true line

    // Handle audio ending
    const handleAudioEnded = () => {
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    audioRef.current.addEventListener("ended", handleAudioEnded);

    // Set up audio context
    const setupAudioContext = () => {
      if (!audioRef.current) return;

      // Create audio context
      audioContextRef.current = new AudioContext();

      // Create analyzer
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 32; // Small FFT for 5 data points

      // Create source from audio element
      const source = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );

      // Connect source -> analyzer -> destination
      source.connect(analyzerRef.current);
      analyzerRef.current.connect(audioContextRef.current.destination);

      // Create data array for analyzer
      const bufferLength = analyzerRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
    };

    setupAudioContext();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [audioPath]);

  const togglePlayback = () => {
    if (!audioRef.current || !audioContextRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      // Resume audio context if it's in suspended state
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      audioRef.current.play();
      updateAudioData();
    }

    setIsPlaying(!isPlaying);
  };

  const updateAudioData = () => {
    if (!analyzerRef.current || !dataArrayRef.current) return;

    analyzerRef.current.getByteFrequencyData(dataArrayRef.current);

    // Extract 5 values from the frequency data
    const stride = Math.floor(dataArrayRef.current.length / 5);
    const newAudioData = Array.from({ length: 5 }, (_, i) => {
      // Normalize to a value between 0 and 1
      return dataArrayRef.current![i * stride] / 255;
    });

    setAudioData(newAudioData);

    animationFrameRef.current = requestAnimationFrame(updateAudioData);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-5 h-48">
        {audioData.map((value, index) => (
          <motion.div
            key={index}
            className="bg-indigo-500"
            initial={{ borderRadius: 50, width: 32, height: 32 }}
            animate={{
              borderRadius: isPlaying ? 25 : 32,
              width: isPlaying ? 32 : 32,
              height: isPlaying ? 32 + value * 200 : 32,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        ))}
      </div>
      <Button variant="outline" className="bg-indigo-50 border-indigo-500 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 dark:bg-zinc-950 dark:border-indigo-500 dark:text-indigo-500 dark:hover:bg-indigo-500/20" onClick={togglePlayback}>
        {isPlaying ? "Stop" : "Play"}
      </Button>
    </div>
  );
};

export default AudioVisualizer;
