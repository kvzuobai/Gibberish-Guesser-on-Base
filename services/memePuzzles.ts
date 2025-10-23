
import { Puzzle } from '../types';

// In a real app, these would be fetched from a server or a larger local library.
// The puzzles here are based on common memes.
const memePuzzles: Puzzle[] = [
  {
    // FIX: Changed 'image' property to 'gibberish' to match the Puzzle type and replaced image data with a phonetic phrase.
    gibberish: 'Bone App The Teeth',
    answer: 'Bon Appetit'
  },
  {
    // FIX: Changed 'image' property to 'gibberish' to match the Puzzle type and replaced image data with a phonetic phrase.
    gibberish: 'I Foreign Eye',
    answer: 'Eye for an Eye'
  }
];

let lastPuzzleIndex = -1;

/**
 * Returns a random meme puzzle, ensuring it's not the same as the last one.
 * @returns A Puzzle object with a gibberish phrase and an answer.
 */
export function getMemePuzzle(): Puzzle {
  let newIndex;
  // Ensure the new puzzle is different from the last one if we have more than one puzzle
  if (memePuzzles.length > 1) {
    do {
      newIndex = Math.floor(Math.random() * memePuzzles.length);
    } while (newIndex === lastPuzzleIndex);
  } else {
    newIndex = 0;
  }
  
  lastPuzzleIndex = newIndex;
  return memePuzzles[newIndex];
}
