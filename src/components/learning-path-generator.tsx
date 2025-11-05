'use client';

import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createLearningPath } from '../app/actions';
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
      <div>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">Your Learning Goal</Label>
            <Input id="goals" name="goals" placeholder="e.g., Become a full-stack web developer" required />
          </div>
          <SubmitButton />
          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
      <div className="rounded-lg border bg-card p-6 h-[500px] overflow-y-auto">
        {state?.learningPath && state.learningPath.length > 0 ? (
          <LearningPathRoadmap steps={state.learningPath} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Lightbulb className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Your path awaits</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your goal to generate a personalized learning path.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
