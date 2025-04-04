
import AudioVisualizer from "@/components/AudioVisualizer";
import Answer from "./answer";

export default function ListeningPage() {
  return (
    <main className="flex items-center justify-center flex-col h-screen max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold">Listening Quiz</h2>
      <p>Write your answer to the quiz from the audio</p>
      <div className="flex flex-col items-center mt-5 w-full max-w-2xl">
        <AudioVisualizer audioPath="/audio/1-easy-listening.wav" />
        <Answer question="ga"/>
      </div>
    </main>
  );
}
