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
      onClick={handleManualPlay}
    >
      {/* Top Text "Bienvenidos aaaaa!" - Absolute Positioned */}
       <div 
         style={{ 
           position: 'absolute',
           top: '8%',
           width: '100%',
           textAlign: 'center',
           zIndex: 20
         }}
       >
         <h2 
           className="font-bold text-white tracking-wider" 
           style={{ 
             textShadow: '0 0 10px #00ffff',
             fontSize: 'min(6vh, 40px)', 
             display: 'inline-block'
           }}
         >
           ¡Bienvenidos aaaaa!
         </h2>
      </div>

      {/* The Oval Logo Background - Centered Absolute */}
      <div 
           style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             // Legacy Gradient fallback
             background: '#207cca', 
             backgroundImage: 'radial-gradient(ellipse at center, #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%)',
             boxShadow: '0 0 30px rgba(0,180,255, 0.6), inset 0 0 20px rgba(0,0,0,0.5)',
             border: '4px solid #d1d5db',
             borderRadius: '50%',
             // Explicit dimensions
             width: '80vw',
             maxWidth: '800px',
             height: '55vh', /* Slightly taller to fit text */
             maxHeight: '550px',
             zIndex: 10,
             // Hardware hack
             WebkitTransform: 'translate(-50%, -50%) translateZ(0)'
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

        {/* "10" - Metallic Top - Absolute in Oval */}
        <h1 className="font-black leading-none tracking-tighter"
            style={{
              position: 'absolute',
              top: '2%', /* Moved up */
              left: 0,
              width: '100%',
              textAlign: 'center',
              fontFamily: 'Impact, sans-serif',
              color: 'white',
              background: '-webkit-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 51%, #f6f6f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
              fontSize: '15vh', /* Fallback */
              // @ts-ignore
              fontSize: 'min(15vh, 150px)',
              zIndex: 30
            }}
        >
          10
        </h1>

        {/* "Olayas" - Gold Script - Absolute in Oval */}
         <h1 className="font-bold"
          style={{
            position: 'absolute',
            top: '35%', /* Explicit Middle-Top */
            left: 0,
            width: '100%',
            textAlign: 'center',
            fontFamily: '"Brush Script MT", "cursive", sans-serif',
            color: '#FFD700',
            textShadow: '2px 2px 0px #8B4513, -1px -1px 0px #FFFFE0, 3px 3px 5px rgba(0,0,0,0.5)',
            transform: 'rotate(-6deg)',
            fontSize: '12vh', /* Fallback */
            // @ts-ignore
            fontSize: 'min(12vh, 120px)',
            zIndex: 40
          }}
         >
           Olayas
         </h1>

        {/* "DICEN" - Metallic Bottom - Absolute in Oval */}
        <h1 className="font-black tracking-widest leading-none"
            style={{
              position: 'absolute',
              top: '72%', /* Explicit Bottom area using top */
              left: 0,
              width: '100%',
              textAlign: 'center',
              fontFamily: 'Arial Black, Impact, sans-serif',
               color: 'white',
               background: '-webkit-linear-gradient(top, #ffffff 0%, #e2e2e2 50%, #dbdbdb 51%, #fefefe 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
               filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
               transform: 'scaleY(0.9)',
               fontSize: '8vh', /* Fallback */
               // @ts-ignore
               fontSize: 'min(10vh, 100px)',
               zIndex: 30
            }}
        >
          DICEN
        </h1>
      </div>

      {/* Start Button - Absolute Centered Bottom */}
      <div style={{
          position: 'absolute',
          bottom: '8%',
          width: '100%',
          textAlign: 'center',
          zIndex: 50
      }}>
        <button
          onClick={onStart}
          className="start-button animate-pulse"
          style={{ 
            fontSize: 'min(5vh, 1.8rem)', 
            padding: 'min(2vh, 1.2rem) min(5vw, 3rem)',
            boxShadow: '0 0 20px rgba(0,255,0,0.6)',
            display: 'inline-block'
          }}
        >
          Comenzar Juego
        </button>

        {!isPlaying && (
            <p className="text-white mt-4 text-sm opacity-70">(Toque la pantalla si no escucha música)</p>
        )}
      </div>
    </div>
  );
};
