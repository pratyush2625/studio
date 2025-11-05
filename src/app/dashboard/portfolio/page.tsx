import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

export default function PortfolioPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Portfolio, Resume & Projects Builder</CardTitle>
          <CardDescription>
            Craft your professional portfolio, build an AI-assisted resume, and showcase your projects. This feature is currently under construction.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
