// Type definitions for Family Feud game

export type Answer = [string, string]; // [answer, points]

export interface QuestionData {
  [question: string]: Answer[];
}

export interface GameConfig {
  maxCards: number;
  maxWrong: number;
}

export type SocketEvent = 
  | 'flipCard'
  | 'awardTeam1'
  | 'awardTeam2'
  | 'newQuestion'
  | 'wrong'
  | 'hostAssigned'
  | 'playDrumRoll'
  | 'resetGame';

export interface SocketEventData {
  trigger: SocketEvent;
  num?: number;
  team?: number;
}

export type Role = 'player' | 'host';
