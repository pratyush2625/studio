
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
  CardDescription,
  CardHeader,
  CardTitle,
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

type SocialLink = {
  platform: string;
  url: string;
};

type Education = {
  institute: string;
  degree: string;
  startYear: string;
  endYear: string;
  gpa: string;
};


export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('Personal Info');

  // State for Personal Info
  const [name, setName] = useState('Kshatriya Pratyush Singh');
  const [headline, setHeadline] = useState('A brief headline about yourself');
  const [email, setEmail] = useState('pratyush.2625@gmail.com');
  const [phone, setPhone] = useState('+91 87905 36250');
  const [location, setLocation] = useState('Hyderabad, India');
  
  // State for Social Links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'Github', url: 'https://github.com/pratyush2625' }
  ]);
  const [newLinkPlatform, setNewLinkPlatform] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // State for Skills & Languages
  const [technicalSkills, setTechnicalSkills] = useState<string[]>(['React.js']);
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  
  // State for Education
  const [educationEntries, setEducationEntries] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState<Education>({ institute: '', degree: '', startYear: '', endYear: '', gpa: '' });

  const handleAddSocialLink = () => {
    if (newLinkPlatform && newLinkUrl) {
      setSocialLinks([...socialLinks, { platform: newLinkPlatform, url: newLinkUrl }]);
      setNewLinkPlatform('');
      setNewLinkUrl('');
    }
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setTechnicalSkills([...technicalSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleEducationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = () => {
    if (newEducation.institute && newEducation.degree) {
      setEducationEntries([...educationEntries, newEducation]);
      setNewEducation({ institute: '', degree: '', startYear: '', endYear: '', gpa: '' });
    }
  };

  const handleRemoveEducation = (index: number) => {
    setEducationEntries(educationEntries.filter((_, i) => i !== index));
  };


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
              <>
                <div>
                  <h2 className="text-2xl font-semibold">Profile Info</h2>
                  <div className="space-y-4 mt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Kshatriya Pratyush Singh" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="headline">Subtitle/Headline</Label>
                      <Input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="A brief headline about yourself" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="pratyush.2625@gmail.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">Contact Info</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 87905 36250" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Hyderabad, India" />
                    </div>
                  </div>
                </div>
            
                <div>
                  <h2 className="text-2xl font-semibold">Social Links</h2>
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {socialLinks.map((link, index) => (
                        <Badge key={index} variant="secondary" className="py-1 px-3">
                          {link.platform}
                          <Button variant="ghost" size="icon" className="h-4 w-4 ml-2" onClick={() => handleRemoveSocialLink(index)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="platform">Platform</Label>
                          <Select value={newLinkPlatform} onValueChange={setNewLinkPlatform}>
                              <SelectTrigger>
                                  <SelectValue placeholder="Select a platform" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="Github">Github</SelectItem>
                                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                  <SelectItem value="Twitter">Twitter</SelectItem>
                                  <SelectItem value="Portfolio">Portfolio</SelectItem>
                              </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="profile-url">Profile URL</Label>
                          <Input id="profile-url" value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="e.g., https://github.com/username" />
                        </div>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto" onClick={handleAddSocialLink}>
                        <Plus className="h-4 w-4 mr-2" /> Add Social Link
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'Skills & Languages' && (
              <>
                <div>
                  <h2 className="text-2xl font-semibold">Technical Skills</h2>
                   <div className="flex items-center gap-2 flex-wrap mt-4">
                      {technicalSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="py-1 px-3">
                          {skill}
                          <Button variant="ghost" size="icon" className="h-4 w-4 ml-2" onClick={() => handleRemoveSkill(index)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  <div className="space-y-4 mt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="skill">Add a Skill</Label>
                      <div className="flex gap-2">
                        <Input id="skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="e.g., Next.js" />
                        <Button onClick={handleAddSkill}>Add</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mt-8">Languages</h2>
                   <div className="flex items-center gap-2 flex-wrap mt-4">
                      {languages.map((lang, index) => (
                        <Badge key={index} variant="secondary" className="py-1 px-3">
                          {lang}
                          <Button variant="ghost" size="icon" className="h-4 w-4 ml-2" onClick={() => handleRemoveLanguage(index)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  <div className="space-y-4 mt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="language">Add a Language</Label>
                      <div className="flex gap-2">
                        <Input id="language" value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} placeholder="e.g., Spanish" />
                        <Button onClick={handleAddLanguage}>Add</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'Education' && (
              <div>
                <h2 className="text-2xl font-semibold">Education</h2>
                <div className="space-y-4 mt-4">
                  {educationEntries.map((entry, index) => (
                    <Card key={index} className="bg-secondary/30">
                      <CardHeader className="flex flex-row items-center justify-between py-3">
                        <CardTitle className="text-base">{entry.institute}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveEducation(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-0 text-sm">
                        <p>{entry.degree}</p>
                        <p className="text-muted-foreground">{entry.startYear} - {entry.endYear}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 border-t pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="institute">Institute</Label>
                      <Input name="institute" value={newEducation.institute} onChange={handleEducationInputChange} placeholder="e.g., Stanford University" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="degree">Degree/Program</Label>
                      <Input name="degree" value={newEducation.degree} onChange={handleEducationInputChange} placeholder="e.g., B.S. in Computer Science" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startYear">Start Year</Label>
                      <Input name="startYear" value={newEducation.startYear} onChange={handleEducationInputChange} placeholder="2020" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endYear">End Year</Label>
                      <Input name="endYear" value={newEducation.endYear} onChange={handleEducationInputChange} placeholder="2024" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gpa">GPA/Percentage</Label>
                      <Input name="gpa" value={newEducation.gpa} onChange={handleEducationInputChange} placeholder="e.g., 3.8/4.0" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleAddEducation}>
                    <Plus className="h-4 w-4 mr-2" /> Add Education
                  </Button>
                </div>
              </div>
            )}


            {/* Other sections will be rendered here based on activeSection */}
            {activeSection !== 'Personal Info' && activeSection !== 'Skills & Languages' && activeSection !== 'Education' &&(
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">
                  Editing section: {activeSection}
                </p>
              </div>
            )}
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
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="text-muted-foreground mt-1">{headline}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                    <span>{location}</span>
                    <span>{phone}</span>
                    <span>{email}</span>
                    {socialLinks.map(link => (
                      <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{link.url}</a>
                    ))}
                </div>

                <div className="mt-6">
                    <h4 className="font-bold text-primary text-xs tracking-widest uppercase">Skills & Languages</h4>
                    <div className="w-full h-px bg-border my-2"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Technical Skills</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {technicalSkills.map((skill, index) => (
                                    <Badge key={index} variant="outline">{skill}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">Languages</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {languages.map((lang, index) => (
                                    <Badge key={index} variant="outline">{lang}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {educationEntries.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-bold text-primary text-xs tracking-widest uppercase">Education</h4>
                    <div className="w-full h-px bg-border my-2"></div>
                    <div className="space-y-3">
                        {educationEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="font-semibold">{entry.institute}</h5>
                                    <p className="text-xs text-muted-foreground">{entry.startYear} - {entry.endYear}</p>
                                </div>
                                <p className="text-muted-foreground">{entry.degree}</p>
                                {entry.gpa && <p className="text-xs text-muted-foreground">GPA: {entry.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </div>
                )}

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    