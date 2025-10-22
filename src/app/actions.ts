'use server';

import { z } from 'zod';
import { aiMentorChatbotAssistance } from '@/ai/flows/ai-mentor-chatbot-assistance';
import { generatePersonalizedLearningPath, PersonalizedLearningPathOutput } from '@/ai/flows/personalized-learning-path-generation';
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
  currentSkillLevel: z.string().min(1, 'Skill level is required.'),
  learningHistory: z.string().min(1, 'Learning history is required.'),
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
    currentSkillLevel: formData.get('currentSkillLevel'),
    learningHistory: formData.get('learningHistory'),
  });

  if (!validatedFields.success) {
    return { error: 'Please fill out all fields.' };
  }

  try {
    const result: PersonalizedLearningPathOutput = await generatePersonalizedLearningPath(validatedFields.data);
    revalidatePath('/dashboard/learning-path');
    return { learningPath: result };
  } catch (e) {
    return { error: 'Failed to generate learning path.' };
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
