"use client";
import React, { useRef, useState, useEffect } from "react";

interface AudioSource {
  element: HTMLAudioElement;
  node: MediaElementAudioSourceNode;
}

interface AudioFile {
  name: string;
  path: string;
  description: string;
}

const AudioVisualizer: React.FC = () => {
  // Sample audio files from public folder
  const audioFiles: AudioFile[] = [
    {
      name: "Sample Beat",
      path: "/audio/1-easy-listening.wav",
      description: "A rhythmic drum pattern",
    },
    {
      name: "Sample Melody",
      path: "/audio/2-normal-listening.wav",
      description: "A melodic instrumental loop",
    },
    {
      name: "Sample Vocals",
      path: "/audio/3-hard-listening.wav",
      description: "A vocal sample",
    },
  ];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<AudioSource | null>(null);
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>(audioFiles[0].path);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize audio context
  useEffect(() => {
    const audioCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyzerNode = audioCtx.createAnalyser();
    analyzerNode.fftSize = 256;
    analyzerNode.smoothingTimeConstant = 0.8;

    const bufferLength = analyzerNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    setAudioContext(audioCtx);
    setAnalyzer(analyzerNode);
    setAudioData(dataArray);

    // Load default audio file
    loadAudioFile(audioFiles[0].path);

    return () => {
      if (audioCtx.state !== "closed") {
        audioCtx.close();
      }
    };
  }, []);

  // Function to load an audio file from the public folder
  const loadAudioFile = (filePath: string): void => {
    if (!audioContext || !analyzer) return;

    // Stop and clean up previous audio if any
    if (isPlaying) {
      stopAudio();
    }

    // Release previous audio source if it exists
    if (audioSource) {
      audioSource.node.disconnect();
    }

    // Create audio element and connect to analyzer
    const audio = new Audio(filePath);
    audio.addEventListener("canplaythrough", () => {
      if (!audioContext || !analyzer) return;

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);
      setAudioSource({ element: audio, node: source });
    });

    audio.addEventListener("error", (e) => {
      console.error("Error loading audio file:", e);
    });
  };

  // Function to handle file selection from dropdown
  const handleFileSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const filePath = event.target.value;
    setSelectedFile(filePath);
    loadAudioFile(filePath);
  };

  // Function to start audio and visualization
  const startAudio = (): void => {
    if (
      !audioSource ||
      !analyzer ||
      !audioContext ||
      audioContext.state === "closed"
    )
      return;

    // Resume audio context if it's suspended
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    audioSource.element.play();
    setIsPlaying(true);

    // Start rendering the visualization
    renderFrame();
  };

  // Function to stop audio
  const stopAudio = (): void => {
    if (!audioSource) return;

    audioSource.element.pause();
    audioSource.element.currentTime = 0;
    setIsPlaying(false);

    // Cancel animation frame
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  // Toggle play/pause
  const togglePlay = (): void => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Function to render visualization frames
  const renderFrame = (): void => {
    if (!canvasRef.current || !analyzer || !audioData) return;

    animationRef.current = requestAnimationFrame(renderFrame);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    if (!canvasCtx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Get frequency data
    analyzer.getByteFrequencyData(audioData);

    // Clear canvas
    canvasCtx.fillStyle = "rgb(0, 0, 0)";
    canvasCtx.fillRect(0, 0, width, height);

    // Calculate bar width based on canvas and data
    const barWidth = (width / audioData.length) * 2.5;
    let x = 0;

    // Draw bars for each frequency
    for (let i = 0; i < audioData.length; i++) {
      const barHeight = (audioData[i] / 255) * height;

      // Use dynamic colors based on frequency
      const r = audioData[i] + 25 * (i / audioData.length);
      const g = 250 * (i / audioData.length);
      const b = 50;

      canvasCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  };

  // Function to get the current audio file description
  const getCurrentAudioDescription = (): string => {
    const currentFile = audioFiles.find((file) => file.path === selectedFile);
    return currentFile ? currentFile.description : "";
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-900 rounded-lg text-white font-sans max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Audio Visualizer</h2>

      <div className="flex flex-col w-full max-w-md gap-4 my-5">
        <div className="flex flex-col">
          <label htmlFor="audio-select" className="text-sm text-gray-300 mb-1">
            Select an audio sample:
          </label>
          <select
            id="audio-select"
            value={selectedFile}
            onChange={handleFileSelect}
            className="bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            {audioFiles.map((file, index) => (
              <option key={index} value={file.path}>
                {file.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-400 mt-2 italic">
            {getCurrentAudioDescription()}
          </p>
        </div>

        <button
          onClick={togglePlay}
          disabled={!audioSource}
          className={`w-full px-5 py-3 text-base font-medium rounded-md transition-all duration-300 transform hover:scale-105 
            ${
              isPlaying
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            } 
            ${
              !audioSource && "bg-gray-500 cursor-not-allowed hover:scale-100"
            }`}
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>

      <div className="w-full mt-3">
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className={`bg-black rounded-md w-full max-w-4xl transition-shadow duration-300 
            ${
              isPlaying
                ? "shadow-lg shadow-green-500/30"
                : "shadow-md shadow-black/50"
            }`}
        />
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Select an audio sample from the dropdown and press Play to see the
        visualization
      </p>
    </div>
  );
};

export default AudioVisualizer;
