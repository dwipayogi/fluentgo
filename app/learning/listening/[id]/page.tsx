import Answer from "./answer";
import { listeningQuestion } from "@/data/listening";
import { notFound } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth";

export function generateStaticParams() {
  return listeningQuestion.map((q) => ({ id: q.id.toString() }));
}

export default function ListeningPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const item = listeningQuestion.find((q) => q.id === id);
  const user = getUserFromCookie();

  if (!item) notFound();

  const currentIndex = listeningQuestion.findIndex((q) => q.id === id);
  const nextItem = listeningQuestion[currentIndex + 1] ?? null;

  // Map listening data ID to database question ID
  // Based on data.ts, listening questions start from ID 11
  const questionId = 10 + id; // This maps listening data ID 1 to database ID 11, etc.

  return (
    <div className="p-6 flex items-center justify-center h-screen">
      <Answer
        question={item.answer}
        currentId={item.id}
        nextId={nextItem ? nextItem.id : null}
        audioPath={item.audio}
        difficulty={item.difficulty}
        totalQuestions={listeningQuestion.length}
        position={currentIndex}
        user_id={user?.id || null}
        questionId={questionId}
      />
    </div>
  );
}
