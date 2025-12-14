import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedScoreProps {
  value: number;
}

export const AnimatedScore = ({ value }: AnimatedScoreProps) => {
  const spring = useSpring(0, { 
    stiffness: 100, 
    damping: 20,
    mass: 1
  });
  
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span>
      {display}
    </motion.span>
  );
};
