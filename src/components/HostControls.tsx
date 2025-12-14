interface HostControlsProps {
  onMakeHost: () => void;
  onAwardTeam1: () => void;
  onAwardTeam2: () => void;
  onNewQuestion: () => void;
  onWrong: () => void;
  onDrumRoll: () => void;
  showHostButton: boolean;
  isHost: boolean;
}

export const HostControls = ({
  onMakeHost,
  onAwardTeam1,
  onAwardTeam2,
  onNewQuestion,
  onWrong,
  onDrumRoll,
  showHostButton,
  isHost,
}: HostControlsProps) => {
  if (!isHost && !showHostButton) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {isHost && (
        <div className="flex justify-center w-full">
           <button onClick={onDrumRoll} className="game-button mb-2">
            🥁 Play Drum Roll
          </button>
        </div>
      )}

      <div className="flex items-center justify-center">
        {showHostButton && !isHost && (
          <button onClick={onMakeHost} className="game-button">
            Be the host
          </button>
        )}

        {isHost && (
          <>
            <button onClick={onAwardTeam1} className="game-button left-round">
              Award Team 1
            </button>
            
            <button onClick={onNewQuestion} className="game-button">
              New Question
            </button>
            
            <button onClick={onWrong} className="game-button wrong-button">
              <img alt="not on board" src="/img/Wrong.svg" />
            </button>
            
            <button onClick={onAwardTeam2} className="game-button right-round">
              Award Team 2
            </button>
          </>
        )}
      </div>
    </div>
  );
};
