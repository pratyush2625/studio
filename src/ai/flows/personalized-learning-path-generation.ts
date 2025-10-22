'use server';

/**
 * @fileOverview Generates personalized learning paths for students based on their goals.
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
});
export type PersonalizedLearningPathInput = z.infer<typeof PersonalizedLearningPathInputSchema>;

const LearningPathStepSchema = z.object({
  step: z.number().describe('The step number in the learning path.'),
  title: z.string().describe('The title of this step.'),
  description: z.string().describe('A detailed description of what to learn in this step, including how to use the skill.'),
  resources: z.array(z.string()).describe('A list of example projects or resources to practice the skill.'),
  url: z.string().url().describe("A dummy URL for a relevant course. Use '#' for now."),
});

const PersonalizedLearningPathOutputSchema = z.array(LearningPathStepSchema);

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
  prompt: `You are an expert AI that generates structured, step-by-step learning roadmaps for students based on their goals.

Your response MUST be a valid JSON array of objects, where each object represents a step in the learning path.

For each step, you must provide:
- A step number.
- A clear title.
- A detailed description of the concepts to learn and how to apply them.
- A list of practical resources or small project ideas.
- A dummy URL ('#') for a course link.

Student Goals: {{{goals}}}

Here is an example of the required JSON output format:
[
  {
    "step": 1,
    "title": "Introduction to Python",
    "description": "Learn the fundamentals of Python programming, including data types, loops, and functions. This is the foundation for data science.",
    "resources": ["Codecademy Python Course", "Automate the Boring Stuff with Python", "Build a simple calculator"],
    "url": "#"
  },
  {
    "step": 2,
    "title": "Data Analysis with Pandas",
    "description": "Master the Pandas library for data manipulation and analysis. Learn how to clean, transform, and visualize data.",
    "resources": ["Pandas Documentation", "Kaggle Micro-courses", "Analyze a public dataset"],
    "url": "#"
  }
]

Now, generate the complete, multi-step learning path based on the student's goals in the specified JSON format. Your entire response must be only the JSON array.`,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await personalizedLearningPathPrompt(input);
    return output || [];
  }
);
