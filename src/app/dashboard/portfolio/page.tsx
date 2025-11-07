
'use client';

import { useState } from 'react';
import {
  User,
  Sparkles,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Award,
  ChevronLeft,
  FileDown,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const resumeSections = [
  { name: 'Personal Info', icon: User },
  { name: 'Skills & Languages', icon: Sparkles },
  { name: 'Education', icon: GraduationCap },
  { name: 'Experience', icon: Briefcase },
  { name: 'Projects', icon: Lightbulb },
  { name: 'Certifications', icon: Award },
];

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('Personal Info');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Left Sidebar */}
      <div className="lg:col-span-3 xl:col-span-2">
        <Card className="h-full">
          <CardContent className="p-4">
            <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/dashboard">
                  <ChevronLeft className="h-4 w-4" /> Go Back to Dashboard
                </Link>
              </Button>
              <p className="px-2 pt-4 pb-2 text-xs font-semibold text-muted-foreground">
                Resume Builder
              </p>
              {resumeSections.map((section) => (
                <Button
                  key={section.name}
                  variant={activeSection === section.name ? 'secondary' : 'ghost'}
                  className="justify-start gap-3"
                  onClick={() => setActiveSection(section.name)}
                >
                  <section.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{section.name}</span>
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>

      {/* Middle Form Content */}
      <div className="lg:col-span-5 xl:col-span-6">
        <Card className="h-full">
          <CardHeader>
            <p className="text-sm text-muted-foreground">
              Tools &gt; Resume Builder &gt; My Resume
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {activeSection === 'Personal Info' && (
              <div>
                <h2 className="text-2xl font-semibold">Profile Info</h2>
                <div className="space-y-4 mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Kshatriya Pratyush Singh" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="headline">Subtitle/Headline</Label>
                    <Input id="headline" placeholder="A brief headline about yourself" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="pratyush.2625@gmail.com" />
                  </div>
                </div>
              </div>
            )}

            {/* Other sections will be rendered here based on activeSection */}
            {activeSection !== 'Personal Info' && (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">
                  Editing section: {activeSection}
                </p>
              </div>
            )}


            <div>
              <h2 className="text-2xl font-semibold">Contact Info</h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 87905 36250" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Hyderabad, India" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold">Social Links</h2>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="py-1 px-3">
                        Github <Button variant="ghost" size="icon" className="h-4 w-4 ml-2"><Trash2 className="h-3 w-3"/></Button>
                    </Badge>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="github">Github</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="twitter">Twitter</SelectItem>
                                <SelectItem value="portfolio">Portfolio</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="profile-url">Profile URL</Label>
                        <Input id="profile-url" placeholder="e.g., https://github.com/username" />
                    </div>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" /> Add Social Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Preview Panel */}
      <div className="lg:col-span-4">
        <Card className="sticky top-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <Select defaultValue="classic">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <FileDown className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </CardHeader>
          <CardContent className="h-[70vh] bg-secondary/30 rounded-b-lg p-6 overflow-y-auto">
            {/* Resume Preview Placeholder */}
            <div className="bg-white p-8 rounded-lg shadow-md h-full text-sm">
                <h3 className="text-xl font-bold">Kshatriya Pratyush Singh</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                    <span>Hyderabad, India</span>
                    <span>+918790536250</span>
                    <span>pratyush.2625@gmail.com</span>
                    <span>https://github.com/pratyush2625</span>
                </div>

                <div className="mt-6">
                    <h4 className="font-bold text-primary text-xs tracking-widest uppercase">Skills & Languages</h4>
                    <div className="w-full h-px bg-border my-2"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Technical Skills</p>
                            <Badge variant="outline" className="mt-2">React.js</Badge>
                        </div>
                        <div>
                            <p className="font-semibold">Languages</p>
                            <Badge variant="outline" className="mt-2">English</Badge>
                        </div>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
