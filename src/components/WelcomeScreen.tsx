import { useEffect, useRef, useState } from 'react';
import '../index.css';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Attempt to autoplay intro music
    const audio = new Audio('/sounds/intro.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleManualPlay = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50,
        background: 'radial-gradient(circle at center, #004e92 0%, #000428 100%)',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={handleManualPlay} // Try to enable audio on any click if blocked
    >
      {/* Background Star Effect (Simplified CSS) */}
      <div className="absolute inset-0 opacity-15" style={{ background: 'url("/img/background.svg") repeat' }}></div>

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center justify-center transform scale-110 md:scale-150 mb-12">
        
        {/* Top Text "Bienvenidos aaaaa!" */}
        <div className="mb-4 text-center">
             <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 10px #00ffff' }}>
               ¡Bienvenidos aaaaa!
             </h2>
        </div>

        {/* The Oval Logo Background */}
        <div className="relative bg-blue-800 rounded-[50%] border-4 border-gray-300 shadow-2xl flex flex-col items-center justify-center px-12 py-8 min-w-[300px] min-h-[200px]"
             style={{
               background: 'radial-gradient(ellipse at center, #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%)',
               boxShadow: '0 0 30px rgba(0,180,255, 0.6), inset 0 0 20px rgba(0,0,0,0.5)'
             }}
        >
          {/* Shine Effect */}
          <div className="absolute top-2 left-1/4 right-1/4 h-1/2 bg-white opacity-20 rounded-[50%] blur-md"></div>

          {/* "10" - Metallic Top */}
          <h1 className="text-6xl font-black leading-none tracking-tighter"
              style={{
                fontFamily: 'Impact, sans-serif',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f1f1f1 50%, #e1e1e1 51%, #f6f6f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))'
              }}
          >
            10
          </h1>

          {/* "Olayas" - Gold Script */}
          <div className="relative -mt-4 mb-2 z-20">
             <h1 className="text-6xl md:text-7xl font-bold -rotate-6 transform"
              style={{
                fontFamily: '"Brush Script MT", "cursive", sans-serif',
                color: '#FFD700',
                textShadow: '2px 2px 0px #8B4513, -1px -1px 0px #FFFFE0, 3px 3px 5px rgba(0,0,0,0.5)',
                // background: 'linear-gradient(to bottom, #fcf6ba 0%, #bf953f 40%, #b38728 50%, #fbf5b7 100%)', // Gold gradient text is tricky with stroke, defaulting to solid color + shadow for robustness
              }}
             >
               Olayas
             </h1>
          </div>

          {/* "DICEN" - Metallic Bottom */}
          <h1 className="text-5xl font-black tracking-widest leading-none z-10"
              style={{
                fontFamily: 'Arial Black, Impact, sans-serif',
                 background: 'linear-gradient(to bottom, #ffffff 0%, #e2e2e2 50%, #dbdbdb 51%, #fefefe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                 filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
                 transform: 'scaleY(0.9)'
              }}
          >
            DICEN
          </h1>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="start-button animate-pulse mt-8 relative z-20"
        style={{ fontSize: '1.8rem', padding: '1.2rem 3rem', boxShadow: '0 0 20px rgba(0,255,0,0.6)' }}
      >
        Comenzar Juego
      </button>

        {!isPlaying && (
            <p className="text-white mt-4 text-sm opacity-70">(Toque la pantalla si no escucha música)</p>
        )}
    </div>
  );
};
