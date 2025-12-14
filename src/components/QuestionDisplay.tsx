interface QuestionDisplayProps {
  question: string;
}

export const QuestionDisplay = ({ question }: QuestionDisplayProps) => {
  return (
    <div className="question-holder">
      <span className="inline-block align-middle leading-normal">
        {question.replace(/&x22;/gi, '"')}
      </span>
    </div>
  );
};
