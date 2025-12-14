import { useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { useGameStore } from './hooks/useGameState';
import questionsData from './data/FamilyFeud_Questions.json';
import type { Answer } from './types/game.types';

function App() {
  const setQuestions = useGameStore((state) => state.setQuestions);

  useEffect(() => {
    // Cast the imported JSON data to the correct type (via unknown to satisfy TypeScript)
    const data = questionsData as unknown as { [question: string]: Answer[] };
    setQuestions(data);
  }, [setQuestions]);

  return <GameBoard />;
}

export default App;
