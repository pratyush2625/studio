import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { LearningPathGenerator } from "../../../components/learning-path-generator";

export default function LearningPathPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Generate Your Learning Path</CardTitle>
          <CardDescription>
            Tell us about your goals, and our AI will craft a personalized step-by-step guide for your learning journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LearningPathGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
