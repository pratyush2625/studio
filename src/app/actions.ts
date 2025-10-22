'use server';

import { z } from 'zod';
import { aiMentorChatbotAssistance } from '@/ai/flows/ai-mentor-chatbot-assistance';
import { generatePersonalizedLearningPath, convertTextToLearningPath } from '@/ai/flows/personalized-learning-path-generation';
import { adjustLearningContent } from '@/ai/flows/sentiment-based-learning-adjustment';
import { revalidatePath } from 'next/cache';
import { LearningPathStep } from '@/lib/types';

// AI Mentor Chatbot Action
const mentorSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty'),
});

type MentorState = {
  response?: string;
  error?: string;
};

export async function getMentorResponse(
  prevState: MentorState,
  formData: FormData
): Promise<MentorState> {
  const validatedFields = mentorSchema.safeParse({ query: formData.get('query') });

  if (!validatedFields.success) {
    return { error: 'Invalid query.' };
  }

  try {
    const result = await aiMentorChatbotAssistance({ query: validatedFields.data.query });
    return { response: result.response };
  } catch (e) {
    return { error: 'Failed to get response from AI mentor.' };
  }
}


// Personalized Learning Path Action
const learningPathSchema = z.object({
  goals: z.string().min(1, 'Goals are required.'),
});

type LearningPathState = {
  learningPath?: LearningPathStep[];
  error?: string;
};

export async function createLearningPath(
  prevState: LearningPathState,
  formData: FormData
): Promise<LearningPathState> {
  const validatedFields = learningPathSchema.safeParse({
    goals: formData.get('goals'),
  });

  if (!validatedFields.success) {
    return { error: 'Please fill out all fields.' };
  }

  try {
    // Step 1: Generate the raw text-based learning path
    const textResult = await generatePersonalizedLearningPath(validatedFields.data);

    if (!textResult.text) {
      return { error: 'Failed to generate initial learning path text.' };
    }

    // Step 2: Convert the text into a structured JSON format
    const structuredResult = await convertTextToLearningPath({ learningPathText: textResult.text });
    
    revalidatePath('/dashboard/learning-path');
    return { learningPath: structuredResult };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to generate learning path.' };
  }
}

// Sentiment Analysis Action
const sentimentSchema = z.object({
  feedback: z.string().min(1, 'Feedback cannot be empty'),
});

type SentimentState = {
  suggestedAdjustment?: string;
  sentiment?: string;
  error?: string;
};

export async function analyzeSentiment(
  prevState: SentimentState,
  formData: FormData
): Promise<SentimentState> {
  const validatedFields = sentimentSchema.safeParse({ feedback: formData.get('feedback') });

  if (!validatedFields.success) {
    return { error: 'Invalid feedback.' };
  }

  try {
    const result = await adjustLearningContent({ 
      studentId: 'user-123', // Static for demo
      interactionText: validatedFields.data.feedback,
      currentContentDifficulty: 'Intermediate' // Static for demo
    });
    return { 
      suggestedAdjustment: result.suggestedAdjustment,
      sentiment: result.sentiment
    };
  } catch (e) {
    return { error: 'Failed to analyze sentiment.' };
  }
}
