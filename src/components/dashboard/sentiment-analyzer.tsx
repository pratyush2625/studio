'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { analyzeSentiment } from '@/app/actions';
import { Smile, Frown, Meh } from 'lucide-react';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Analyzing...' : 'Analyze My Mood'}
    </Button>
  );
}

export function SentimentAnalyzer() {
  const [state, formAction] = useActionState(analyzeSentiment, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.suggestedAdjustment) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="space-y-4">
      <form ref={formRef} action={formAction} className="space-y-4">
        <Textarea
          name="feedback"
          placeholder="e.g., 'I'm feeling stuck on this topic' or 'This is exciting!'"
          required
        />
        <SubmitButton />
      </form>
      {state?.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {state?.suggestedAdjustment && (
        <Alert variant="default" className="bg-accent/50">
          {state.sentiment?.toLowerCase() === 'positive' && <Smile className="h-4 w-4" />}
          {state.sentiment?.toLowerCase() === 'negative' && <Frown className="h-4 w-4" />}
          {state.sentiment?.toLowerCase() === 'neutral' && <Meh className="h-4 w-4" />}
          <AlertTitle className="capitalize">
            {state.sentiment || 'Feedback Received'}
          </AlertTitle>
          <AlertDescription>{state.suggestedAdjustment}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
