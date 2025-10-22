'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createLearningPath } from '@/app/actions';
import { Alert, AlertDescription } from './ui/alert';
import { Lightbulb } from 'lucide-react';
import { LearningPathRoadmap } from './learning-path-roadmap';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : 'Generate My Path'}
    </Button>
  );
}

export function LearningPathGenerator() {
  const [state, formAction] = useActionState(createLearningPath, undefined);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goals">Your Goals</Label>
          <Input id="goals" name="goals" placeholder="e.g., Become a full-stack web developer" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentSkillLevel">Current Skill Level</Label>
          <Input id="currentSkillLevel" name="currentSkillLevel" placeholder="e.g., Beginner in HTML/CSS, some JavaScript knowledge" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="learningHistory">Learning Preferences & History</Label>
          <Textarea id="learningHistory" name="learningHistory" placeholder="e.g., I prefer project-based learning and have completed a few online tutorials." required />
        </div>
        <SubmitButton />
        {state?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </form>
      <div className="rounded-lg border bg-card p-6 h-[500px] overflow-y-auto">
        {state?.learningPath && state.learningPath.length > 0 ? (
           <div>
            <h3 className="font-headline text-xl mb-4">Your Personalized Path</h3>
            <LearningPathRoadmap steps={state.learningPath} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Lightbulb className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Your path awaits</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form to generate your personalized learning path.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
