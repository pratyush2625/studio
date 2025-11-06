import Link from 'next/link';
import type { Internship } from '../../lib/types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ArrowRight, Briefcase, Clock, MapPin } from 'lucide-react';

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <Card className="flex flex-col sm:flex-row">
      <div className="flex-1">
        <CardHeader>
            <div className="flex items-start justify-between">
                <Badge variant="outline">{internship.company}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{internship.duration}</span>
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl">{internship.title}</CardTitle>
          <CardDescription className="mt-2 line-clamp-2">
            {internship.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            {internship.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-6 items-center border-t sm:border-t-0 sm:border-l">
        <Button asChild className="w-full">
            <Link href={internship.url}>
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
