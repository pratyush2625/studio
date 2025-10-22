import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { recommendedCourses } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CourseCard } from "../courses/course-card";

export function CourseRecommendations() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recommended Courses</CardTitle>
          <CardDescription>Courses tailored to help you reach your goals.</CardDescription>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/courses">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
