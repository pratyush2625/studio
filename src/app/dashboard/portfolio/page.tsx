
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
import { Textarea } from '@/components/ui/textarea';

const resumeSections = [
  { name: 'Personal Info', icon: User },
  { name: 'Skills & Languages', icon: Sparkles },
  { name: 'Education', icon: GraduationCap },
  { name: 'Experience', icon: Briefcase },
  { name: 'Projects', icon: Lightbulb },
  { name: 'Certifications', icon: Award },
];

// Type Definitions
type SocialLink = { platform: string; url: string };
type Education = { institute: string; degree: string; startYear: string; endYear: string; gpa: string };
type Experience = { company: string; title: string; duration: string; description: string };
type Project = { name: string; tech: string; link: string; description: string };
type Certification = { title: string; provider: string; date: string };


export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('Personal Info');

  // --- State for all sections ---
  const [name, setName] = useState('Kshatriya Pratyush Singh');
  const [headline, setHeadline] = useState('A brief headline about yourself');
  const [email, setEmail] = useState('pratyush.2625@gmail.com');
  const [phone, setPhone] = useState('+91 87905 36250');
  const [location, setLocation] = useState('Hyderabad, India');
  
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([ { platform: 'Github', url: 'https://github.com/pratyush2625' } ]);
  const [newLinkPlatform, setNewLinkPlatform] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const [technicalSkills, setTechnicalSkills] = useState<string[]>(['React.js']);
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  
  const [educationEntries, setEducationEntries] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState<Education>({ institute: '', degree: '', startYear: '', endYear: '', gpa: '' });

  const [experienceEntries, setExperienceEntries] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({ company: '', title: '', duration: '', description: '' });

  const [projectEntries, setProjectEntries] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({ name: '', tech: '', link: '', description: '' });

  const [certificationEntries, setCertificationEntries] = useState<Certification[]>([]);
  const [newCertification, setNewCertification] = useState<Certification>({ title: '', provider: '', date: '' });

  // --- Handlers ---
  const handleAddSocialLink = () => {
    if (newLinkPlatform && newLinkUrl) {
      setSocialLinks([...socialLinks, { platform: newLinkPlatform, url: newLinkUrl }]);
      setNewLinkPlatform('');
      setNewLinkUrl('');
    }
  };
  const handleRemoveSocialLink = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));
  
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setTechnicalSkills([...technicalSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  const handleRemoveSkill = (index: number) => setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };
  const handleRemoveLanguage = (index: number) => setLanguages(languages.filter((_, i) => i !== index));

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
  const handleRemoveEducation = (index: number) => setEducationEntries(educationEntries.filter((_, i) => i !== index));

  const handleExperienceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
  };
  const handleAddExperience = () => {
    if (newExperience.company && newExperience.title) {
      setExperienceEntries([...experienceEntries, newExperience]);
      setNewExperience({ company: '', title: '', duration: '', description: '' });
    }
  };
  const handleRemoveExperience = (index: number) => setExperienceEntries(experienceEntries.filter((_, i) => i !== index));
  
  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };
  const handleAddProject = () => {
    if (newProject.name && newProject.tech) {
      setProjectEntries([...projectEntries, newProject]);
      setNewProject({ name: '', tech: '', link: '', description: '' });
    }
  };
  const handleRemoveProject = (index: number) => setProjectEntries(projectEntries.filter((_, i) => i !== index));

  const handleCertificationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({ ...prev, [name]: value }));
  };
  const handleAddCertification = () => {
    if (newCertification.title && newCertification.provider) {
      setCertificationEntries([...certificationEntries, newCertification]);
      setNewCertification({ title: '', provider: '', date: '' });
    }
  };
  const handleRemoveCertification = (index: number) => setCertificationEntries(certificationEntries.filter((_, i) => i !== index));


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

            {activeSection === 'Experience' && (
              <div>
                <h2 className="text-2xl font-semibold">Work Experience</h2>
                <div className="space-y-4 mt-4">
                  {experienceEntries.map((entry, index) => (
                    <Card key={index} className="bg-secondary/30">
                      <CardHeader className="flex flex-row items-center justify-between py-3">
                         <div>
                            <CardTitle className="text-base">{entry.title}</CardTitle>
                            <p className="text-sm font-normal text-muted-foreground">{entry.company}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveExperience(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 border-t pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input name="company" value={newExperience.company} onChange={handleExperienceInputChange} placeholder="e.g., Google" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input name="title" value={newExperience.title} onChange={handleExperienceInputChange} placeholder="e.g., Software Engineer Intern" />
                    </div>
                  </div>
                   <div className="grid gap-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input name="duration" value={newExperience.duration} onChange={handleExperienceInputChange} placeholder="e.g., May 2023 - Aug 2023" />
                    </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" value={newExperience.description} onChange={handleExperienceInputChange} placeholder="Describe your roles and achievements..." />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleAddExperience}>
                    <Plus className="h-4 w-4 mr-2" /> Add Experience
                  </Button>
                </div>
              </div>
            )}

            {activeSection === 'Projects' && (
              <div>
                <h2 className="text-2xl font-semibold">Projects</h2>
                <div className="space-y-4 mt-4">
                  {projectEntries.map((entry, index) => (
                    <Card key={index} className="bg-secondary/30">
                      <CardHeader className="flex flex-row items-center justify-between py-3">
                         <CardTitle className="text-base">{entry.name}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveProject(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 border-t pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input name="name" value={newProject.name} onChange={handleProjectInputChange} placeholder="e.g., Portfolio Website" />
                    </div>
                     <div className="grid gap-2">
                      <Label htmlFor="tech">Technologies Used</Label>
                      <Input name="tech" value={newProject.tech} onChange={handleProjectInputChange} placeholder="e.g., Next.js, Tailwind CSS" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="link">Project Link</Label>
                    <Input name="link" value={newProject.link} onChange={handleProjectInputChange} placeholder="e.g., https://github.com/user/project" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" value={newProject.description} onChange={handleProjectInputChange} placeholder="Describe your project..." />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleAddProject}>
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Button>
                </div>
              </div>
            )}

            {activeSection === 'Certifications' && (
              <div>
                <h2 className="text-2xl font-semibold">Certifications</h2>
                 <div className="space-y-4 mt-4">
                  {certificationEntries.map((entry, index) => (
                    <Card key={index} className="bg-secondary/30">
                      <CardHeader className="flex flex-row items-center justify-between py-3">
                         <CardTitle className="text-base">{entry.title}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveCertification(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 border-t pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Certification Title</Label>
                      <Input name="title" value={newCertification.title} onChange={handleCertificationInputChange} placeholder="e.g., AWS Certified Cloud Practitioner" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="provider">Provider</Label>
                      <Input name="provider" value={newCertification.provider} onChange={handleCertificationInputChange} placeholder="e.g., Amazon Web Services" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="date">Date Issued</Label>
                      <Input name="date" value={newCertification.date} onChange={handleCertificationInputChange} placeholder="e.g., June 2024" />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleAddCertification}>
                    <Plus className="h-4 w-4 mr-2" /> Add Certification
                  </Button>
                </div>
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
                
                {experienceEntries.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-bold text-primary text-xs tracking-widest uppercase">Experience</h4>
                    <div className="w-full h-px bg-border my-2"></div>
                    <div className="space-y-3">
                        {experienceEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="font-semibold">{entry.title}</h5>
                                    <p className="text-xs text-muted-foreground">{entry.duration}</p>
                                </div>
                                <p className="font-medium text-muted-foreground">{entry.company}</p>
                                <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{entry.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {projectEntries.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-bold text-primary text-xs tracking-widest uppercase">Projects</h4>
                    <div className="w-full h-px bg-border my-2"></div>
                    <div className="space-y-3">
                        {projectEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="font-semibold">{entry.name}</h5>
                                    <a href={entry.link} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">View Project</a>
                                </div>
                                <p className="text-sm text-muted-foreground">{entry.tech}</p>
                                <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{entry.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {certificationEntries.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-bold text-primary text-xs tracking-widest uppercase">Certifications</h4>
                    <div className="w-full h-px bg-border my-2"></div>
                    <div className="space-y-3">
                        {certificationEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="font-semibold">{entry.title}</h5>
                                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                                </div>
                                <p className="text-muted-foreground">{entry.provider}</p>
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

    