export enum ArcanaType {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR'
}

export enum Suit {
  WANDS = 'WANDS', // Fire
  CUPS = 'CUPS',   // Water
  SWORDS = 'SWORDS', // Air
  PENTACLES = 'PENTACLES', // Earth
  NONE = 'NONE' // Major Arcana
}

export interface CardDefinition {
  id: number;
  nameEn: string;
  nameCn: string;
  type: ArcanaType;
  suit: Suit;
  number?: number; // 1-14 for Minor, 0-21 for Major
  meaningUp: string;
  meaningRev: string;
  keywords: string[];
}

export interface DrawnCard extends CardDefinition {
  isReversed: boolean;
  positionIndex: number; // Position in the spread
  isRevealed: boolean;
}

export enum SpreadType {
  SINGLE = 'SINGLE',
  THREE_CARD = 'THREE_CARD', // Past, Present, Future
  CELTIC_CROSS = 'CELTIC_CROSS'
}

export interface SpreadConfig {
  id: SpreadType;
  name: string;
  description: string;
  cardCount: number;
  positionMeanings: string[]; // Meaning of each position (e.g., "The Past")
}

export enum AppState {
  INTRO = 'INTRO',
  SHUFFLING = 'SHUFFLING',
  SPREAD_DEALING = 'SPREAD_DEALING',
  READING = 'READING',
  SUMMARY = 'SUMMARY'
}