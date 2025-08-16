import SpeechRecorder from "./answer";
import { speakingQuestion } from "@/data/speaking";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return speakingQuestion.map((q) => ({ id: q.id.toString() }));
}

export default function SpeakingPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const item = speakingQuestion.find((q) => q.id === id);

  if (!item) notFound();

  const currentIndex = speakingQuestion.findIndex((q) => q.id === id);
  const nextItem = speakingQuestion[currentIndex + 1] ?? null;

  return (
    <main className="flex items-center justify-center flex-col h-screen max-w-7xl mx-auto">
        <SpeechRecorder
          prompt={item.answer}
          currentId={item.id}
          nextId={nextItem ? nextItem.id : null}
        />
    </main>
  );
}
