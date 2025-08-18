import { getQuestionByNumber, getTotalQuestions, getQuestionPosition } from "@/actions/learn-action";
import SpeechRecorder from "./answer";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const number = Number(params.id);
  const question = await getQuestionByNumber("speaking", number);

  if (!question) {
    return <div className="p-6">Question not found.</div>;
  }

  const total = await getTotalQuestions("speaking");
  const position = await getQuestionPosition("speaking", number);

  // compute next question number
  const nextPosition = position + 1;
  const nextNumber = nextPosition < total ? number + 1 : null;

  return (
    <div className="p-6">
      <SpeechRecorder
        prompt={question.text}
        currentNumber={question.number}
        nextNumber={nextNumber}
        difficulty={question.difficulty}
        totalQuestions={total}
        position={position}
      />
    </div>
  );
}
