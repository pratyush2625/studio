'use server';

/**
 * @fileOverview Generates personalized learning paths for students based on their goals, skill level, and learning history.
 *
 * - generatePersonalizedLearningPath - A function that generates personalized learning paths.
 * - PersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  goals: z
    .string()
    .describe('The student’s learning goals (e.g., become a data scientist).'),
  currentSkillLevel: z
    .string()
    .describe('The student’s current skill level in relevant areas (e.g., beginner, intermediate, advanced).'),
  learningHistory: z
    .string()
    .describe('A summary of the student’s previous learning experiences and preferences.'),
});
export type PersonalizedLearningPathInput = z.infer<typeof PersonalizedLearningPathInputSchema>;

const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z.string().describe('A personalized learning path for the student.'),
});
export type PersonalizedLearningPathOutput = z.infer<typeof PersonalizedLearningPathOutputSchema>;

export async function generatePersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const personalizedLearningPathPrompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI learning path generator. Generate a personalized learning path for a student based on their goals, current skill level, and learning history.

Student Goals: {{{goals}}}
Current Skill Level: {{{currentSkillLevel}}}
Learning History: {{{learningHistory}}}

Personalized Learning Path:`,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await personalizedLearningPathPrompt(input);
    return output!;
  }
);
