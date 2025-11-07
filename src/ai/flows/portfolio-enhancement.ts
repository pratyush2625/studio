'use server';

/**
 * @fileOverview Enhances a user's portfolio by generating an engaging "About Me" summary.
 *
 * - generateAboutMe - A function that creates a summary based on resume data.
 * - GenerateAboutMeInput - The input type for the generateAboutMe function.
 * - GenerateAboutMeOutput - The return type for the generateAboutMe function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';
import type { Education, Experience, Project, Certification } from '@/lib/types';


const EducationSchema = z.object({
  institute: z.string(),
  degree: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  gpa: z.string(),
});

const ExperienceSchema = z.object({
  company: z.string(),
  title: z.string(),
  duration: z.string(),
  description: z.string(),
});

const ProjectSchema = z.object({
  name: z.string(),
  tech: z.string(),
  link: z.string(),
  description: z.string(),
});

const CertificationSchema = z.object({
  title: z.string(),
  provider: z.string(),
  date: z.string(),
});


const GenerateAboutMeInputSchema = z.object({
  name: z.string().describe('The user\'s full name.'),
  headline: z.string().describe('The user\'s professional headline or subtitle.'),
  technicalSkills: z.array(z.string()).describe('A list of the user\'s technical skills.'),
  experience: z.array(ExperienceSchema).describe('A list of the user\'s work experiences.'),
  projects: z.array(ProjectSchema).describe('A list of the user\'s projects.'),
});
export type GenerateAboutMeInput = z.infer<typeof GenerateAboutMeInputSchema>;


const GenerateAboutMeOutputSchema = z.object({
  aboutMeText: z.string().describe('The generated "About Me" summary text, written in the first person.'),
});
export type GenerateAboutMeOutput = z.infer<typeof GenerateAboutMeOutputSchema>;

export async function generateAboutMe(input: GenerateAboutMeInput): Promise<GenerateAboutMeOutput> {
  return generateAboutMeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAboutMePrompt',
  input: {schema: GenerateAboutMeInputSchema},
  output: {schema: GenerateAboutMeOutputSchema},
  prompt: `You are a professional career coach and expert resume writer. Your task is to generate a compelling, first-person "About Me" summary for a student or professional's public portfolio.

The summary should be engaging, concise (2-4 sentences), and highlight the individual's key strengths, passions, and aspirations based on the provided resume data.

Use the following information:
- Name: {{{name}}}
- Headline: {{{headline}}}
- Skills: {{{jsonStringify technicalSkills}}}
- Experience: {{{jsonStringify experience}}}
- Projects: {{{jsonStringify projects}}}

Based on this data, craft a summary that captures their story and makes them stand out. Focus on their passion and what drives them.

Example output format:
{
  "aboutMeText": "As a passionate software engineer, I love building beautiful and functional web applications that solve real-world problems. I'm currently diving deep into AI and machine learning, and I'm excited to leverage my skills in React and Next.js to create innovative solutions."
}

Now, generate the "About Me" text based on the provided user data.
`,
});

const generateAboutMeFlow = ai.defineFlow(
  {
    name: 'generateAboutMeFlow',
    inputSchema: GenerateAboutMeInputSchema,
    outputSchema: GenerateAboutMeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
