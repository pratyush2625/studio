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

const LearningPathStepSchema = z.object({
  step: z.number().describe('The step number in the learning path.'),
  title: z.string().describe('The title of this step.'),
  description: z.string().describe('A detailed description of what to learn in this step, including how to use the skill.'),
  resources: z.array(z.string()).describe('A list of example projects or resources to practice the skill.'),
  url: z.string().url().describe("A dummy URL for a relevant course. Use '#' for now."),
});

const PersonalizedLearningPathOutputSchema = z.array(LearningPathStepSchema).describe('A personalized learning path for the student, broken down into a roadmap of steps.');

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
  prompt: `You are an AI learning path generator. Generate a structured, step-by-step roadmap for a student based on their goals, skill level, and learning history.

For each step, provide a clear title, a detailed description of the concepts to learn and how to apply them, a list of practical resources or small project ideas, and a dummy URL ('#') for a course link.

Student Goals: {{{goals}}}
Current Skill Level: {{{currentSkillLevel}}}
Learning History: {{{learningHistory}}}

Generate the learning path in the requested JSON format. The output should be an array of learning path steps.`,
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
