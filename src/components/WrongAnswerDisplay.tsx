import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WrongAnswerDisplayProps {
  wrongCount: number;
}

export const WrongAnswerDisplay = ({ wrongCount }: WrongAnswerDisplayProps) => {
  const [show, setShow] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (wrongCount > 0) {
      setDisplayCount(wrongCount);
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [wrongCount]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-50"
        >
          {[1, 2, 3].map((num) => (
            <img
              key={num}
              alt="not on board"
              src="/img/Wrong.svg"
              className="p-2"
              style={{
                height: '80%',
                width: '30%',
                opacity: num <= displayCount ? 1 : 0,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
