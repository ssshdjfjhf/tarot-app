import { DECK } from "../constants";
import { DrawnCard } from "../types";

/**
 * Fisher-Yates Shuffle for true randomness
 */
export const shuffleDeck = (): DrawnCard[] => {
  const deck = [...DECK];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  // Assign random orientation (Upright/Reversed) and initialize drawn state
  return deck.map((card, index) => ({
    ...card,
    isReversed: Math.random() < 0.5, // 50% chance of reversal
    positionIndex: -1,
    isRevealed: false
  }));
};

/**
 * Draw X cards from the top of the shuffled deck
 */
export const drawCards = (shuffledDeck: DrawnCard[], count: number): DrawnCard[] => {
  return shuffledDeck.slice(0, count).map((card, index) => ({
    ...card,
    positionIndex: index
  }));
};