'use client';

import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

const exampleGoals = [
    'Become a Data Scientist',
    'Learn Full-Stack Web Development',
    'Master UI/UX Design',
    'Create Mobile Apps with React Native'
]

export function LearningPathGenerator() {
  const [state, formAction] = useActionState(createLearningPath, undefined);
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleExampleClick = (goal: string) => {
    if (inputRef.current) {
        inputRef.current.value = goal;
        formRef.current?.requestSubmit();
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">Your Learning Goal</Label>
            <Input ref={inputRef} id="goals" name="goals" placeholder="e.g., Become a full-stack web developer" required />
          </div>
          <SubmitButton />
          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </form>
         <div className="mt-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Or try an example:</p>
            <div className="flex flex-wrap gap-2">
                {exampleGoals.map(goal => (
                    <Button key={goal} variant="outline" size="sm" onClick={() => handleExampleClick(goal)}>
                        {goal}
                    </Button>
                ))}
            </div>
        </div>
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
