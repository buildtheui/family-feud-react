import { useState } from 'react';
import { AnswerCard } from './AnswerCard';
import { QuestionDisplay } from './QuestionDisplay';
import { HostControls } from './HostControls';
import { WrongAnswerDisplay } from './WrongAnswerDisplay';
import { AnimatedScore } from './AnimatedScore';
import { useGameStore } from '../hooks/useGameState';
import { useSocket } from '../hooks/useSocket';

export const GameBoard = () => {
  const { emit } = useSocket();

  const role = useGameStore((state) => state.role);
  const hostAssigned = useGameStore((state) => state.hostAssigned);
  const setRole = useGameStore((state) => state.setRole);
  const setHostAssigned = useGameStore((state) => state.setHostAssigned);
  const reset = useGameStore((state) => state.reset);
  const currentAnswers = useGameStore((state) => state.currentAnswers);
  const flippedCards = useGameStore((state) => state.flippedCards);
  const flipCard = useGameStore((state) => state.flipCard);
  const awardPoints = useGameStore((state) => state.awardPoints);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const incrementWrong = useGameStore((state) => state.incrementWrong);
  const boardScore = useGameStore((state) => state.boardScore);
  const team1Score = useGameStore((state) => state.team1Score);
  const team2Score = useGameStore((state) => state.team2Score);
  const wrong = useGameStore((state) => state.wrong);
  const questions = useGameStore((state) => state.questions);
  const currentQ = useGameStore((state) => state.currentQ);

  // Sync local setShowHostButton behavior with global state
  // If we are host, or if hostAssigned is true, button should be hidden for us (handled by HostControls logic)
  // HostControls logic: if (!isHost && !showHostButton) return null;
  // We need to pass !hostAssigned as showHostButton
  
  const handleMakeHost = () => {
    setRole('host');
    setHostAssigned(true); // Set locally immediately
    emit('hostAssigned');
  };

  const handleFlipCard = (index: number) => {
    flipCard(index);
    emit('flipCard', { num: index });
  };

  const handleAwardTeam1 = () => {
    awardPoints(1);
    emit('awardTeam1');
  };

  const handleAwardTeam2 = () => {
    awardPoints(2);
    emit('awardTeam2');
  };

  const handleNewQuestion = () => {
    nextQuestion();
    emit('newQuestion');
  };

  const handleWrong = () => {
    incrementWrong();
    emit('wrong');
  };

  const handleDrumRoll = () => {
    emit('playDrumRoll');
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar el juego? Se borrarán todos los puntos.')) {
      const input = prompt('Ingrese el número de la pregunta para comenzar (1 para la primera):', '1');
      let startIdx = 0;
      
      if (input !== null) {
        const parsed = parseInt(input);
        if (!isNaN(parsed) && parsed > 0) {
            startIdx = parsed - 1; // Convert 1-based to 0-based
        }
      }
      
      reset(startIdx);
      emit('resetGame', { startQuestionIndex: startIdx });
    }
  };

  // Generate answer cards (always show 10 cards)
  const maxCards = 10;
  const cards = Array.from({ length: maxCards }, (_, i) => {
    const answer = currentAnswers[i] || null;
    return {
      answer,
      index: i,
      isFlipped: flippedCards.has(i),
      isEmpty: !answer,
    };
  });

  const currentQuestion = questions[currentQ] || 'Cargando...';
  const isHost = role === 'host';
  
  // Show host button only if NO host is assigned yet
  const showHostButton = !hostAssigned;

  const [audioEnabled, setAudioEnabled] = useState(false);

  const enableAudio = () => {
    setAudioEnabled(true);
    // Try to unlock audio context by playing and immediately pausing a silent sound
    const audio = new Audio();
    audio.play().catch(() => {}).finally(() => audio.pause());
  };

  if (!audioEnabled) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
        <button
          onClick={enableAudio}
          className="px-8 py-4 text-2xl font-bold text-white transition-transform bg-green-600 rounded-lg shadow-lg hover:scale-105 active:scale-95 animate-pulse"
        >
          Comenzar Juego
        </button>
      </div>
    );
  }

  return (
    <div className={`game-board ${isHost ? 'host-mode' : ''}`}>
      {/* Board Score - Center Top */}
      <div style={{ gridArea: 'scoreM' }} className="flex items-center justify-center relative">
        <div className="score-box">
          <AnimatedScore value={boardScore} />
        </div>
        {isHost && (
          <button
            onClick={handleReset}
            className="absolute left-[calc(100%+20px)] top-1/2 -translate-y-1/2 px-4 py-2 text-sm font-bold text-white bg-red-600 border-2 border-white rounded-lg shadow-lg hover:bg-red-700 whitespace-nowrap"
            title="Reiniciar Juego"
          >
            ⚠️ Reiniciar
          </button>
        )}
      </div>

      {/* Team 1 Score - Left */}
      <div style={{ gridArea: 'scoreT1' }} className="flex items-center justify-center">
        <div className="score-box">
          <AnimatedScore value={team1Score} />
        </div>
      </div>

      {/* Team 2 Score - Right */}
      <div style={{ gridArea: 'scoreT2' }} className="flex items-center justify-center">
        <div className="score-box">
          <AnimatedScore value={team2Score} />
        </div>
      </div>

      {/* Main Board */}
      <div style={{ gridArea: 'main' }} className="w-[70vw] mx-auto relative">
        <QuestionDisplay question={currentQuestion} />

        {/* Answers Grid */}
        <div className="col-holder">
          {cards.map(({ answer, index, isFlipped, isEmpty }) => (
            <AnswerCard
              key={index}
              answer={answer}
              index={index}
              isFlipped={isFlipped}
              isEmpty={isEmpty}
              isHost={isHost}
              onFlip={handleFlipCard}
            />
          ))}
        </div>

        {/* Wrong Answer Display */}
        <WrongAnswerDisplay wrongCount={wrong} />
      </div>

      {/* Host Controls */}
      <div style={{ gridArea: 'host' }} className="flex items-center justify-center">
        <HostControls
          onMakeHost={handleMakeHost}
          onAwardTeam1={handleAwardTeam1}
          onAwardTeam2={handleAwardTeam2}
          onNewQuestion={handleNewQuestion}
          onWrong={handleWrong}
          onDrumRoll={handleDrumRoll}
          showHostButton={showHostButton}
          isHost={isHost}
        />
      </div>
    </div>
  );
};
