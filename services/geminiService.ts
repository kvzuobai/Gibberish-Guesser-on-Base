
import { GoogleGenAI, Type } from "@google/genai";
import { Puzzle, Difficulty, PuzzleTheme } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const difficultyPrompts = {
  easy: "Generate a funny and clever 'gibberish' phrase and its corresponding real phrase. The gibberish should be simple, short, and based on a common, everyday phrase. For example, Gibberish: 'aisle of ewe', Real Phrase: 'I love you'.",
  medium: "Generate a funny and clever 'gibberish' phrase and its corresponding real phrase. The phrase should be of moderate complexity, possibly a well-known quote, song lyric, or multi-word concept. For example, Gibberish: 'wreck amend day shun', Real Phrase: 'recommendation'.",
  hard: "Generate a challenging and clever 'gibberish' phrase and its corresponding real phrase. The phrase should be complex, obscure, a full sentence, or a technical term, requiring more thought to decipher. For example, Gibberish: 'fur stand form host', Real Phrase: 'first and foremost'.",
};

const themePrompts = {
  General: '',
  Movies: 'The phrase must be a well-known movie title, quote, or character name.',
  Science: 'The phrase must be a common scientific term, concept, or a famous scientist\'s name.',
  History: 'The phrase must be related to a significant historical event, figure, or concept.',
};


/**
 * Generates a new gibberish puzzle using the Gemini API based on difficulty and theme.
 * @param difficulty The selected difficulty level.
 * @param theme The selected puzzle theme.
 * @returns A promise that resolves to a Puzzle object.
 * @throws An error if the API response is invalid or cannot be parsed.
 */
export async function getGibberishPuzzle(difficulty: Difficulty, theme: PuzzleTheme): Promise<Puzzle> {
  const themeInstruction = themePrompts[theme];
  // FIX: Removed redundant JSON instruction from prompt as responseSchema handles the formatting.
  const prompt = `${difficultyPrompts[difficulty]} ${themeInstruction}`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gibberish: {
              type: Type.STRING,
              description: "The nonsensical phrase that sounds like a real phrase.",
            },
            answer: {
              type: Type.STRING,
              description: "The real phrase that the gibberish sounds like.",
            },
          },
          required: ["gibberish", "answer"],
        },
      },
    });

    const jsonString = response.text.trim();
    const puzzle = JSON.parse(jsonString);

    if (puzzle && puzzle.gibberish && puzzle.answer) {
      return puzzle as Puzzle;
    } else {
      throw new Error("Invalid puzzle format received from API.");
    }
    // FIX: Explicitly type caught error to 'any' to resolve potential TypeScript compilation issues with strict settings.
  } catch (error: any) {
    console.error("Error processing gibberish puzzle response:", error);
    // Re-throw the error to be handled by the UI component
    throw error;
  }
}

/**
 * Generates a hint for a given answer using the Gemini API.
 * @param answer The correct answer to generate a hint for.
 * @returns A promise that resolves to a hint string.
 */
export async function getHintForAnswer(answer: string): Promise<string> {
  try {
    const prompt = `Generate a short, one-sentence hint for the phrase "${answer}". The hint should be clever and not too obvious. Do not include the answer or any part of it in the hint.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const hint = response.text.trim();
    if (hint) {
      return hint;
    } else {
      throw new Error("Empty hint received from API.");
    }
    // FIX: Re-throw the error to allow the calling component to handle the UI state.
    // Also, explicitly typed caught error to 'any' to resolve potential TypeScript compilation issues.
  } catch (error: any) {
    console.error("Error fetching hint:", error);
    throw error;
  }
}
