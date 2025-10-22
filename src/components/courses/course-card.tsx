import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find((p) => p.id === course.imageId);

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        {image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            width={600}
            height={400}
            data-ai-hint={image.imageHint}
            className="rounded-t-lg object-cover aspect-[3/2]"
          />
        )}
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Badge variant="secondary" className="mb-2">{course.platform}</Badge>
        <CardTitle className="text-base font-bold leading-snug">{course.title}</CardTitle>
        <CardDescription className="mt-1 text-sm line-clamp-2">
          {course.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={course.url}>
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
