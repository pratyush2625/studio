import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allCourses } from "@/lib/data";
import { CourseCard } from "@/components/courses/course-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CoursesPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Explore Courses</CardTitle>
          <CardDescription>
            Browse our curated list of courses from top platforms to find your next learning opportunity.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex items-center gap-4">
        <Input placeholder="Search courses..." className="flex-1" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="udemy">Udemy</SelectItem>
            <SelectItem value="coursera">Coursera</SelectItem>
            <SelectItem value="pluralsight">Pluralsight</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
