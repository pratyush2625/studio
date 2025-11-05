'use server';

/**
 * @fileOverview Generates personalized learning paths for students based on their goals.
 * This file now contains a two-step process:
 * 1. generatePersonalizedLearningPath: Generates a text-based learning path.
 * 2. convertTextToLearningPath: Converts the text path into a structured JSON format.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

// Step 1: Input and Output for Text Generation
const PersonalizedLearningPathTextInputSchema = z.object({
  goals: z
    .string()
    .describe('The student’s learning goals (e.g., become a data scientist).'),
});
export type PersonalizedLearningPathTextInput = z.infer<typeof PersonalizedLearningPathTextInputSchema>;

const PersonalizedLearningPathTextOutputSchema = z.object({
    text: z.string().describe("The generated learning path as a structured text.")
});
export type PersonalizedLearningPathTextOutput = z.infer<typeof PersonalizedLearningPathTextOutputSchema>;


// Step 2: Input and Output for JSON Conversion
const ConvertTextToLearningPathInputSchema = z.object({
    learningPathText: z.string().describe("The text-based learning path to convert.")
});
export type ConvertTextToLearningPathInput = z.infer<typeof ConvertTextToLearningPathInputSchema>;

const LearningPathStepSchema = z.object({
  step: z.number().describe('The step number in the learning path.'),
  title: z.string().describe('The title of this step.'),
  description: z.string().describe('A detailed description of what to learn in this step, including how to use the skill.'),
  resources: z.array(z.string()).describe('A list of example projects or resources to practice the skill.'),
  url: z.string().describe("A dummy URL for a relevant course. Use '#' for now."),
});
const PersonalizedLearningPathOutputSchema = z.array(LearningPathStepSchema);
export type PersonalizedLearningPathOutput = z.infer<typeof PersonalizedLearningPathOutputSchema>;


// ~~~~~~~~~~~~~~~~~~ AI Flows ~~~~~~~~~~~~~~~~~~

// Flow 1: Generate Text
export async function generatePersonalizedLearningPath(
  input: PersonalizedLearningPathTextInput
): Promise<PersonalizedLearningPathTextOutput> {
  return personalizedLearningPathTextFlow(input);
}

const textGenerationPrompt = ai.definePrompt({
  name: 'personalizedLearningPathTextPrompt',
  input: {schema: PersonalizedLearningPathTextInputSchema},
  output: {schema: PersonalizedLearningPathTextOutputSchema},
  prompt: `You are an expert AI that generates structured, step-by-step learning roadmaps for students based on their goals. Create a detailed, multi-step roadmap. For each step, provide a clear title, a detailed description of the concepts, and a list of practical resources or project ideas.

Student Goals: {{{goals}}}

Generate the learning path as a clear, well-formatted text.
`,
});

const personalizedLearningPathTextFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathTextFlow',
    inputSchema: PersonalizedLearningPathTextInputSchema,
    outputSchema: PersonalizedLearningPathTextOutputSchema,
  },
  async input => {
    const {output} = await textGenerationPrompt(input);
    return output!;
  }
);


// Flow 2: Convert Text to JSON
export async function convertTextToLearningPath(
  input: ConvertTextToLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return textToJsonFlow(input);
}

const textToJsonPrompt = ai.definePrompt({
  name: 'textToJsonPrompt',
  input: {schema: ConvertTextToLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are a data formatting expert. Your sole purpose is to convert the following text-based learning path into a structured JSON array of objects.

Your response MUST be only the valid JSON array of objects, where each object represents a step in the learning path.

For each step, you must extract:
- A step number.
- A clear title.
- A detailed description.
- A list of resources/projects.
- A dummy URL ('#') for a course link.

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

Now, convert the following text into the specified JSON format. Your entire response must be only the JSON array.

Learning Path Text:
{{{learningPathText}}}
`,
});

const textToJsonFlow = ai.defineFlow(
  {
    name: 'textToJsonFlow',
    inputSchema: ConvertTextToLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await textToJsonPrompt(input);
    return output || [];
  }
);
