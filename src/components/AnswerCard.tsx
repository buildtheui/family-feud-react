import { motion } from 'framer-motion';
import type { Answer } from '../types/game.types';

interface AnswerCardProps {
  answer: Answer | null;
  index: number;
  isFlipped: boolean;
  isEmpty: boolean;
  isHost: boolean;
  onFlip: (index: number) => void;
}

export const AnswerCard = ({ answer, index, isFlipped, isEmpty, isHost, onFlip }: AnswerCardProps) => {
  if (isEmpty) {
    return <div className="card-holder empty"><div className="card-side front"></div></div>;
  }

  if (!answer) return null;

  const [answerText, points] = answer;

  return (
    <div 
      className="card-holder"
      onClick={() => onFlip(index)}
    >
      <motion.div
        className="card-inner"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
      >
        {/* Front - Number with optional answer text for host */}
        <div className="card-side front">
          <span className="number-circle">{index + 1}</span>
          {isHost && <span className="answer-text">{answerText}</span>}
        </div>

        {/* Back - Answer text with points */}
        <div className="card-side back">
          <span className="answer-content">{answerText}</span>
          <span className="points-box">{points}</span>
        </div>
      </motion.div>
    </div>
  );
};
