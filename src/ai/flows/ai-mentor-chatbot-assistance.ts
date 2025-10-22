'use server';

/**
 * @fileOverview Provides personalized career guidance and mentorship through an AI-powered chatbot.
 *
 * - aiMentorChatbotAssistance - A function that handles the AI mentor chatbot assistance.
 * - AIMentorChatbotAssistanceInput - The input type for the aiMentorChatbotAssistance function.
 * - AIMentorChatbotAssistanceOutput - The return type for the aiMentorChatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMentorChatbotAssistanceInputSchema = z.object({
  query: z.string().describe('The query or question from the student.'),
});
export type AIMentorChatbotAssistanceInput = z.infer<typeof AIMentorChatbotAssistanceInputSchema>;

const AIMentorChatbotAssistanceOutputSchema = z.object({
  response: z.string().describe('The AI mentor chatbot response to the student query.'),
});
export type AIMentorChatbotAssistanceOutput = z.infer<typeof AIMentorChatbotAssistanceOutputSchema>;

export async function aiMentorChatbotAssistance(input: AIMentorChatbotAssistanceInput): Promise<AIMentorChatbotAssistanceOutput> {
  return aiMentorChatbotAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMentorChatbotAssistancePrompt',
  input: {schema: AIMentorChatbotAssistanceInputSchema},
  output: {schema: AIMentorChatbotAssistanceOutputSchema},
  prompt: `You are an AI mentor chatbot providing career guidance to students.

  A student has asked the following question:
  {{query}}
  
  Provide a helpful and personalized response to help the student make informed decisions about their educational and professional future.`,
});

const aiMentorChatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'aiMentorChatbotAssistanceFlow',
    inputSchema: AIMentorChatbotAssistanceInputSchema,
    outputSchema: AIMentorChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
