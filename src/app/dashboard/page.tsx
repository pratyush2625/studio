import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillGraph } from "@/components/dashboard/skill-graph"
import { SentimentAnalyzer } from "@/components/dashboard/sentiment-analyzer"
import { CourseRecommendations } from "@/components/dashboard/course-recommendations"

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-3">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Welcome back, Alex!</CardTitle>
            <CardDescription>
              Ready to learn something new today? Here&apos;s a summary of your progress.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Skill Constellation</CardTitle>
          <CardDescription>
            A visualization of your current skill levels.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <SkillGraph />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Mood</CardTitle>
          <CardDescription>How are you feeling about your progress?</CardDescription>
        </CardHeader>
        <CardContent>
          <SentimentAnalyzer />
        </CardContent>
      </Card>
      
      <div className="lg:col-span-3">
        <CourseRecommendations />
      </div>
    </div>
  );
}
