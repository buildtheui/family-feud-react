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
      <div className="relative z-10 flex flex-col items-center justify-center mb-8 w-full">
        
        {/* Top Text "Bienvenidos aaaaa!" */}
        <div className="mb-6 text-center">
             <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 10px #00ffff' }}>
               ¡Bienvenidos aaaaa!
             </h2>
        </div>

        {/* The Oval Logo Background */}
        <div className="relative flex flex-col items-center justify-center"
             style={{
               background: 'radial-gradient(ellipse at center, #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%)',
               boxShadow: '0 0 30px rgba(0,180,255, 0.6), inset 0 0 20px rgba(0,0,0,0.5)',
               border: '4px solid #d1d5db', // gray-300
               borderRadius: '50%',
               width: '60vw',
               height: '40vh',
               minWidth: '500px',
               minHeight: '300px',
               maxWidth: '800px',
               maxHeight: '500px'
             }}
        >
          {/* Shine Effect */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            right: '20%',
            height: '40%',
            backgroundColor: 'white',
            opacity: 0.1,
            borderRadius: '50%',
            filter: 'blur(10px)'
          }}></div>

          {/* "10" - Metallic Top */}
          <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tighter"
              style={{
                fontFamily: 'Impact, sans-serif',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f1f1f1 50%, #e1e1e1 51%, #f6f6f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
                marginBottom: '-10px',
                zIndex: 10
              }}
          >
            10
          </h1>

          {/* "Olayas" - Gold Script */}
          <div className="relative z-20" style={{ marginTop: '-10px', marginBottom: '5px' }}>
             <h1 className="text-7xl md:text-8xl font-bold"
              style={{
                fontFamily: '"Brush Script MT", "cursive", sans-serif',
                color: '#FFD700',
                textShadow: '2px 2px 0px #8B4513, -1px -1px 0px #FFFFE0, 3px 3px 5px rgba(0,0,0,0.5)',
                transform: 'rotate(-6deg)'
              }}
             >
               Olayas
             </h1>
          </div>

          {/* "DICEN" - Metallic Bottom */}
          <h1 className="text-6xl md:text-7xl font-black tracking-widest leading-none z-10"
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
