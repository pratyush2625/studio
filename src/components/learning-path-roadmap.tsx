'use client';

import { Check, Milestone } from 'lucide-react';
import type { LearningPathStep } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface LearningPathRoadmapProps {
  steps: LearningPathStep[];
}

export function LearningPathRoadmap({ steps }: LearningPathRoadmapProps) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step.step} className="relative flex items-start">
            <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary -translate-x-1/2">
              <span className="text-xs font-bold text-primary-foreground">{step.step}</span>
            </div>
            <Card className="ml-8 w-full">
                <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    {step.resources && step.resources.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Suggested Resources & Projects:</h4>
                            <div className="flex flex-wrap gap-2">
                                {step.resources.map((resource, i) => (
                                    <Badge key={i} variant="secondary">{resource}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
