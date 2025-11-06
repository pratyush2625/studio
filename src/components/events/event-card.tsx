import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '../../lib/types';
import { PlaceHolderImages } from '../../lib/placeholder-images';
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
import { ArrowRight, CalendarDays, Users } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const image = PlaceHolderImages.find((p) => p.id === event.imageId);

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        {image && (
          <Image
            src={image.imageUrl}
            alt={event.title}
            width={600}
            height={400}
            data-ai-hint={image.imageHint}
            className="rounded-t-lg object-cover aspect-[3/2]"
          />
        )}
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Badge variant="secondary" className="mb-2">{event.category}</Badge>
        <CardTitle className="text-base font-bold leading-snug">{event.title}</CardTitle>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
                <CalendarDays className='h-3 w-3' />
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
                <Users className='h-3 w-3' />
                <span>{event.teamSize.min}-{event.teamSize.max} members</span>
            </div>
        </div>
        <CardDescription className="mt-2 text-sm line-clamp-2">
          {event.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={event.url}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
