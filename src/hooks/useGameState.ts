import { create } from 'zustand';
import type { Role, Answer } from '../types/game.types';

interface GameState {
  role: Role;
  currentQ: number;
  wrong: number;
  boardScore: number;
  team1Score: number;
  team2Score: number;
  flippedCards: Set<number>;
  questions: string[];
  allData: { [question: string]: Answer[] };
  currentAnswers: Answer[];
  
  // Actions
  setRole: (role: Role) => void;
  setQuestions: (data: { [question: string]: Answer[] }) => void;
  flipCard: (index: number) => void;
  awardPoints: (team: number) => void;
  nextQuestion: () => void;
  incrementWrong: () => void;
  reset: () => void;
  getBoardScore: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  role: 'player',
  currentQ: 0,
  wrong: 0,
  boardScore: 0,
  team1Score: 0,
  team2Score: 0,
  flippedCards: new Set(),
  questions: [],
  allData: {},
  currentAnswers: [],

  setRole: (role) => set({ role }),

  setQuestions: (data) => {
    const questions = Object.keys(data);
    const currentAnswers = data[questions[0]];
    set({ allData: data, questions, currentAnswers });
  },

  flipCard: (index) => {
    const { flippedCards } = get();
    const newFlipped = new Set(flippedCards);
    
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    
    set({ flippedCards: newFlipped });
    
    // Recalculate board score
    get().getBoardScore();
  },

  getBoardScore: () => {
    const { currentAnswers, flippedCards } = get();
    let score = 0;
    
    flippedCards.forEach((index) => {
      if (currentAnswers[index]) {
        score += parseInt(currentAnswers[index][1]);
      }
    });
    
    set({ boardScore: score });
  },

  awardPoints: (team) => {
    const { boardScore, team1Score, team2Score } = get();
    
    if (team === 1) {
      set({ team1Score: team1Score + boardScore, boardScore: 0 });
    } else {
      set({ team2Score: team2Score + boardScore, boardScore: 0 });
    }
  },

  nextQuestion: () => {
    const { currentQ, questions, allData } = get();
    const nextQ = currentQ + 1;
    const newAnswers = allData[questions[nextQ]];
    
    // FIRST: Reset all cards to unflipped state with empty answers
    // This prevents showing new answers on previously flipped cards
    set({
      flippedCards: new Set(),
      currentAnswers: [],
      boardScore: 0,
      wrong: 0,
    });
    
    // THEN: After a brief moment, load the new question and answers
    setTimeout(() => {
      set({
        currentQ: nextQ,
        currentAnswers: newAnswers,
      });
    }, 50);
  },

  incrementWrong: () => {
    const { wrong } = get();
    set({ wrong: wrong + 1 });
  },

  reset: () => {
    set({
      currentQ: 0,
      wrong: 0,
      boardScore: 0,
      flippedCards: new Set(),
    });
  },
}));
