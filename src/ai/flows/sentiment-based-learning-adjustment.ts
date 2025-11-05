'use server';

/**
 * @fileOverview Adjusts learning content based on sentiment analysis of student interactions.
 *
 * - adjustLearningContent - Analyzes sentiment and adjusts learning content accordingly.
 * - SentimentBasedLearningAdjustmentInput - The input type for adjustLearningContent.
 * - SentimentBasedLearningAdjustmentOutput - The return type for adjustLearningContent.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SentimentBasedLearningAdjustmentInputSchema = z.object({
  studentId: z.string().describe('Unique identifier for the student.'),
  interactionText: z.string().describe('Text of the student interaction (e.g., chat message, forum post).'),
  currentContentDifficulty: z.string().describe('The current difficulty level of the learning content.'),
});
export type SentimentBasedLearningAdjustmentInput = z.infer<typeof SentimentBasedLearningAdjustmentInputSchema>;

const SentimentBasedLearningAdjustmentOutputSchema = z.object({
  sentiment: z.string().describe('The sentiment detected in the student interaction (positive, negative, neutral).'),
  suggestedAdjustment: z.string().describe('Suggested adjustment to the learning content (e.g., increase difficulty, provide simpler explanation, offer encouragement).'),
});
export type SentimentBasedLearningAdjustmentOutput = z.infer<typeof SentimentBasedLearningAdjustmentOutputSchema>;

export async function adjustLearningContent(input: SentimentBasedLearningAdjustmentInput): Promise<SentimentBasedLearningAdjustmentOutput> {
  return adjustLearningContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sentimentBasedLearningAdjustmentPrompt',
  input: {schema: SentimentBasedLearningAdjustmentInputSchema},
  output: {schema: SentimentBasedLearningAdjustmentOutputSchema},
  prompt: `You are an AI learning assistant that analyzes student sentiment and suggests adjustments to learning content.

  Analyze the student's interaction text to determine their sentiment (positive, negative, or neutral).
  Based on the sentiment and the current content difficulty, suggest an adjustment to the learning content to maintain engagement and motivation.

  Student ID: {{{studentId}}}
  Interaction Text: {{{interactionText}}}
  Current Content Difficulty: {{{currentContentDifficulty}}}

  Respond with the detected sentiment and the suggested adjustment.
  Ensure that the output is in the correct JSON format.

  Here are some possible adjustments:
  - If sentiment is negative and difficulty is high: Provide a simpler explanation of the current concept.
  - If sentiment is negative and difficulty is low: Increase the difficulty to challenge the student.
  - If sentiment is positive: Offer encouragement and suggest moving to the next topic.
  - If sentiment is neutral: Maintain the current difficulty level and provide additional examples.

  {
    "sentiment": "<sentiment>",
    "suggestedAdjustment": "<suggested adjustment>"
  }`,
});

const adjustLearningContentFlow = ai.defineFlow(
  {
    name: 'adjustLearningContentFlow',
    inputSchema: SentimentBasedLearningAdjustmentInputSchema,
    outputSchema: SentimentBasedLearningAdjustmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
