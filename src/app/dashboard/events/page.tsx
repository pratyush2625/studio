import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

export default function EventsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Events & Internships Hub</CardTitle>
          <CardDescription>
            Discover events, join teams, and find internship opportunities to grow your skills. This feature is currently under construction.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
