import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';

const features = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'Personalized Learning Paths',
    description:
      'Our AI generates custom learning journeys based on your goals, skill level, and learning style.',
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'Sentiment Analysis',
    description:
      'We track your learning emotions to adjust content and keep you motivated and engaged.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Mentor Chatbot',
    description:
      'Get instant answers, career advice, and real-time guidance from your personal AI mentor.',
  },
  {
    icon: <LayoutGrid className="h-8 w-8 text-primary" />,
    title: 'Skill Portfolio',
    description:
      'Showcase your skills and projects in a professional portfolio to attract employers and clients.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">LearnAI</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-16 text-center md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
              Revolutionize Your Learning Journey with AI
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Learnify AI provides personalized learning paths, real-time mentorship, and emotional tracking to bridge the gap between education and your dream career.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start Learning for Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="container space-y-12 bg-secondary/50 py-16 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              A Smarter Way to Learn
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our platform is packed with features designed to make learning more effective, engaging, and aligned with your career aspirations.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col justify-between">
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="container">
        <div className="flex flex-col items-center justify-between gap-4 border-t py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Logo />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by you. The source code is available on GitHub.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
