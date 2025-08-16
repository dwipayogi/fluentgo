import AudioVisualizer from "@/components/AudioVisualizer";
import Answer from "./answer";
import { listeningQuestion } from "@/data/listening";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return listeningQuestion.map((q) => ({ id: q.id.toString() }));
}

export default function ListeningPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const item = listeningQuestion.find((q) => q.id === id);

  if (!item) notFound();

  const currentIndex = listeningQuestion.findIndex((q) => q.id === id);
  const nextItem = listeningQuestion[currentIndex + 1] ?? null;

  return (
    <main className="flex items-center justify-center flex-col h-screen max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold">Listening Quiz</h2>
      <p>Write your answer to the quiz from the audio</p>
      <div className="flex flex-col items-center mt-5 w-full max-w-2xl">
        <AudioVisualizer audioPath={item.audio} />
        <Answer question={item.answer} currentId={item.id} nextId={nextItem ? nextItem.id : null} />
      </div>
    </main>
  );
}
