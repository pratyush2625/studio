import { Button } from "../../../components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { EventCard } from "../../../components/events/event-card";
import { InternshipCard } from "../../../components/events/internship-card";
import { allEvents, recommendedEvents, allInternships } from "../../../lib/data";

export default function EventsPage() {
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Events & Internships Hub</CardTitle>
          <CardDescription>
            Discover events, join teams, and find internship opportunities to grow your skills.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* AI Recommended Events */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Recommended For You</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* All Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="ghost" size="sm">Hackathons</Button>
                <Button variant="ghost" size="sm">Workshops</Button>
                <Button variant="ghost" size="sm">Webinars</Button>
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      
      {/* Internships */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Internship Opportunities</h2>
         <div className="grid gap-6">
          {allInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </div>
    </div>
  );
}
