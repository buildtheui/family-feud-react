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
      <div 
        className="absolute opacity-30" 
        style={{ 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'url("/img/background.svg") repeat',
          zIndex: 0
        }}
      ></div>

      {/* Main Logo Container */}
      <div 
        className="relative z-10 w-full mb-8"
        style={{
          textAlign: 'center', // Fix text alignment on legacy browsers
          display: 'block' // Fallback from flex
        }}
      >
        
        {/* Top Text "Bienvenidos aaaaa!" */}
        <div className="mb-6" style={{ width: '100%', textAlign: 'center' }}>
             <h2 
               className="font-bold text-white tracking-wider" 
               style={{ 
                 textShadow: '0 0 10px #00ffff',
                 fontSize: 'min(5vw, 40px)', 
                 marginBottom: '20px',
                 display: 'inline-block' // Ensure it respects text-align
               }}
             >
               ¡Bienvenidos aaaaa!
             </h2>
        </div>

        {/* The Oval Logo Background */}
        <div className="relative"
             style={{
               // Legacy Gradient fallback
               background: '#207cca', 
               backgroundImage: 'radial-gradient(ellipse at center, #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%)',
               boxShadow: '0 0 30px rgba(0,180,255, 0.6), inset 0 0 20px rgba(0,0,0,0.5)',
               border: '4px solid #d1d5db',
               borderRadius: '50%', // Standard
               // Explicit centering for block elements
               marginLeft: 'auto',
               marginRight: 'auto',
               // Explicit dimensions
               width: '80vw',
               maxWidth: '800px',
               height: '50vh',
               maxHeight: '500px',
               // Flex centering for content inside
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               // Hardware acceleration hack for border-radius clipping
               transform: 'translateZ(0)'
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
          <h1 className="font-black leading-none tracking-tighter"
              style={{
                fontFamily: 'Impact, sans-serif',
                color: 'white', // Fallback
                background: '-webkit-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 51%, #f6f6f6 100%)', // Webkit prefix
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
                marginBottom: '-10px',
                zIndex: 10,
                fontSize: 'min(15vw, 150px)',
                width: '100%', // Ensure centering
                textAlign: 'center'
              }}
          >
            10
          </h1>

          {/* "Olayas" - Gold Script */}
          <div className="relative z-20" style={{ marginTop: '-10px', marginBottom: '5px', width: '100%', textAlign: 'center' }}>
             <h1 className="font-bold"
              style={{
                fontFamily: '"Brush Script MT", "cursive", sans-serif',
                color: '#FFD700',
                textShadow: '2px 2px 0px #8B4513, -1px -1px 0px #FFFFE0, 3px 3px 5px rgba(0,0,0,0.5)',
                transform: 'rotate(-6deg)',
                display: 'inline-block',
                fontSize: 'min(12vw, 120px)'
              }}
             >
               Olayas
             </h1>
          </div>

          {/* "DICEN" - Metallic Bottom */}
          <h1 className="font-black tracking-widest leading-none z-10"
              style={{
                fontFamily: 'Arial Black, Impact, sans-serif',
                 color: 'white',
                 background: '-webkit-linear-gradient(top, #ffffff 0%, #e2e2e2 50%, #dbdbdb 51%, #fefefe 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                 filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
                 transform: 'scaleY(0.9)',
                 fontSize: 'min(10vw, 100px)',
                 width: '100%',
                 textAlign: 'center'
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
