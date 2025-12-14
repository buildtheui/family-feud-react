import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { SocketEventData } from '../types/game.types';
import { useGameStore } from './useGameState';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  
  // Sound refs
  const drumRollRef = useRef<HTMLAudioElement | null>(null);
  const successRef = useRef<HTMLAudioElement | null>(null);
  const errorRef = useRef<HTMLAudioElement | null>(null);
  const newRef = useRef<HTMLAudioElement | null>(null);
  const celebrationRef = useRef<HTMLAudioElement | null>(null);
  const applauseRef = useRef<HTMLAudioElement | null>(null);

  // Initialize sounds
  useEffect(() => {
    drumRollRef.current = new Audio('/sounds/drum_roll.mp3');
    drumRollRef.current.loop = true;
    
    successRef.current = new Audio('/sounds/success.mp3');
    errorRef.current = new Audio('/sounds/error.mp3');
    newRef.current = new Audio('/sounds/new.mp3');
    celebrationRef.current = new Audio('/sounds/celebration.mp3');
    applauseRef.current = new Audio('/sounds/applause.mp3');

    return () => {
      // Cleanup sounds
      [drumRollRef, successRef, errorRef, newRef, celebrationRef, applauseRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    };
  }, []);

  // Helper to play sounds safely
  // Note: Only plays if NOT host, enforced by logic below
  const playSound = (sound: HTMLAudioElement | null) => {
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.error('Error playing sound:', e));
    }
  };

  const stopDrumRoll = () => {
    if (drumRollRef.current) {
      drumRollRef.current.pause();
      drumRollRef.current.currentTime = 0;
    }
  };
  
  // Get actions from store
  const flipCard = useGameStore((state) => state.flipCard);
  const awardPoints = useGameStore((state) => state.awardPoints);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const incrementWrong = useGameStore((state) => state.incrementWrong);

  useEffect(() => {
    // Connect to Socket.io server
    // Use environment variable if set, otherwise relative path in prod (same server), or localhost in dev
    const serverUrl = import.meta.env.VITE_SERVER_URL || (import.meta.env.PROD ? '/' : 'http://localhost:3456');
    
    socketRef.current = io(serverUrl, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.io server:', socketRef.current?.id);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
    });

    socketRef.current.on('listening', (data: SocketEventData) => {
      console.log('Received socket event:', data);
      
      // Get the CURRENT role from the store (not stale closure value)
      const currentRole = useGameStore.getState().role;
      
      // Only process events if we are NOT the host
      // The host already applied the action locally before emitting
      if (currentRole === 'host') {
        return;
      }
      
      // Play sounds based on events (Only for non-hosts, as per above check)
      switch (data.trigger) {
        case 'newQuestion':
          stopDrumRoll();
          playSound(newRef.current);
          nextQuestion();
          break;
        case 'awardTeam1':
        case 'awardTeam2':
            stopDrumRoll();
            playSound(celebrationRef.current);
            playSound(applauseRef.current);
            awardPoints(data.trigger === 'awardTeam1' ? 1 : 2);
          break;
        case 'flipCard':
          if (data.num !== undefined) {
            stopDrumRoll();
            playSound(successRef.current);
            flipCard(data.num);
          }
          break;
        case 'playDrumRoll':
          // playDrumRoll doesn't affect state, just sound
           if (drumRollRef.current) {
               drumRollRef.current.currentTime = 0;
               drumRollRef.current.play().catch(e => console.error('Error playing drum roll:', e));
           }
           break;
        case 'hostAssigned':
          // Host has been assigned - players should not show host button
          useGameStore.getState().setHostAssigned(true);
          break;
        case 'wrong':
          stopDrumRoll();
          playSound(errorRef.current);
          incrementWrong();
          break;
      }
    });

    return () => {
      console.log('Disconnecting socket');
      socketRef.current?.disconnect();
    };
  }, [flipCard, awardPoints, nextQuestion, incrementWrong]);

  const emit = useCallback((trigger: string, data: Partial<SocketEventData> = {}) => {
    // Always emit if socket is connected (host check is done in GameBoard)
    if (socketRef.current) {
      console.log('Emitting event:', trigger, data);
      socketRef.current.emit('talking', { trigger, ...data });
    }
  }, []);

  return { emit };
};
