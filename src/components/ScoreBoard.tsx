import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface ScoreBoardProps {
  boardScore: number;
  team1Score: number;
  team2Score: number;
}

const AnimatedScore = ({ value }: { value: number }) => {
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

export const ScoreBoard = ({ boardScore, team1Score, team2Score }: ScoreBoardProps) => {
  return (
    <>
      {/* Board Score */}
      <div className="bg-button-gradient text-white text-4xl font-bold w-[95px] py-4 px-3 border-2 border-white shadow-[inset_0_1px_24px_1px_rgba(0,0,0,0.48)] text-center">
        <AnimatedScore value={boardScore} />
      </div>

      {/* Team 1 Score */}
      <div className="bg-button-gradient text-white text-4xl font-bold w-[95px] py-4 px-3 border-2 border-white shadow-[inset_0_1px_24px_1px_rgba(0,0,0,0.48)] text-center">
        <AnimatedScore value={team1Score} />
      </div>

      {/* Team 2 Score */}
      <div className="bg-button-gradient text-white text-4xl font-bold w-[95px] py-4 px-3 border-2 border-white shadow-[inset_0_1px_24px_1px_rgba(0,0,0,0.48)] text-center">
        <AnimatedScore value={team2Score} />
      </div>
    </>
  );
};
