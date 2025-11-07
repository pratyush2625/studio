'use client';

import { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  Copy,
  Upload,
  Link as LinkIcon,
  Save,
  File,
  FilePlus,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Share2,
  BookUser,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { ClassicTemplate } from '@/components/portfolio/classic-template';
import { ModernTemplate } from '@/components/portfolio/modern-template';
import { MinimalTemplate } from '@/components/portfolio/minimal-template';
import { Separator } from '@/components/ui/separator';
import { ResumeList } from '@/components/portfolio/resume-list';
import { PortfolioView } from '@/components/portfolio/portfolio-view';


const resumeSections = [
  { name: 'Resume Builder', icon: FilePlus },
  { name: 'My Resumes', icon: File },
  { name: 'Portfolio', icon: BookUser },
];

const builderSections = [
  { name: 'Personal Info', icon: User },
  { name: 'Skills & Languages', icon: Sparkles },
  { name: 'Education', icon: GraduationCap },
  { name: 'Experience', icon: Briefcase },
  { name: 'Projects', icon: Lightbulb },
  { name: 'Certifications', icon: Award },
];


// Type Definitions
export type SocialLink = { platform: string; url: string };
export type Education = { institute: string; degree: string; startYear: string; endYear: string; gpa: string };
export type Experience = { company: string; title: string; duration: string; description: string };
export type Project = { name: string; tech: string; link: string; description: string };
export type Certification = { title: string; provider: string; date: string };
export type ResumeData = {
    id: string;
    resumeName: string;
    name: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    socialLinks: SocialLink[];
    technicalSkills: string[];
    languages: string[];
    educationEntries: Education[];
    experienceEntries: Experience[];
    projectEntries: Project[];
    certificationEntries: Certification[];
}

const initialResumeData: ResumeData = {
    id: `resume-${Date.now()}`,
    resumeName: 'My First Resume',
    name: 'Kshatriya Pratyush Singh',
    headline: 'A brief headline about yourself',
    email: 'pratyush.2625@gmail.com',
    phone: '+91 87905 36250',
    location: 'Hyderabad, India',
    socialLinks: [ { platform: 'Github', url: 'https://github.com/pratyush2625' } ],
    technicalSkills: ['React.js'],
    languages: ['English'],
    educationEntries: [],
    experienceEntries: [],
    projectEntries: [],
    certificationEntries: [],
};


export default function PortfolioPage() {
  const [activeView, setActiveView] = useState('Resume Builder');
  const [activeSection, setActiveSection] = useState('Personal Info');
  const [template, setTemplate] = useState('classic');
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const [resumes, setResumes] = useState<ResumeData[]>([initialResumeData]);
  const [currentResume, setCurrentResume] = useState<ResumeData>(initialResumeData);
  const [portfolioResume, setPortfolioResume] = useState<ResumeData | null>(null);

  // --- State for all sections ---
  const [resumeName, setResumeName] = useState(currentResume.resumeName);
  const [name, setName] = useState(currentResume.name);
  const [headline, setHeadline] = useState(currentResume.headline);
  const [email, setEmail] = useState(currentResume.email);
  const [phone, setPhone] = useState(currentResume.phone);
  const [location, setLocation] = useState(currentResume.location);
  
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(currentResume.socialLinks);
  const [newLinkPlatform, setNewLinkPlatform] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const [technicalSkills, setTechnicalSkills] = useState<string[]>(currentResume.technicalSkills);
  const [languages, setLanguages] = useState<string[]>(currentResume.languages);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  
  const [educationEntries, setEducationEntries] = useState<Education[]>(currentResume.educationEntries);
  const [newEducation, setNewEducation] = useState<Education>({ institute: '', degree: '', startYear: '', endYear: '', gpa: '' });

  const [experienceEntries, setExperienceEntries] = useState<Experience[]>(currentResume.experienceEntries);
  const [newExperience, setNewExperience] = useState<Experience>({ company: '', title: '', duration: '', description: '' });

  const [projectEntries, setProjectEntries] = useState<Project[]>(currentResume.projectEntries);
  const [newProject, setNewProject] = useState<Project>({ name: '', tech: '', link: '', description: '' });

  const [certificationEntries, setCertificationEntries] = useState<Certification[]>(currentResume.certificationEntries);
  const [newCertification, setNewCertification] = useState<Certification>({ title: '', provider: '', date: '' });
  
  const [aboutMe, setAboutMe] = useState('Aspiring software engineer with a passion for building beautiful and functional web applications. Currently diving deep into AI and machine learning.');


  const loadResumeIntoEditor = (resume: ResumeData) => {
    setCurrentResume(resume);
    setActiveView('Resume Builder');
  }

  useEffect(() => {
    if (currentResume) {
        setResumeName(currentResume.resumeName);
        setName(currentResume.name);
        setHeadline(currentResume.headline);
        setEmail(currentResume.email);
        setPhone(currentResume.phone);
        setLocation(currentResume.location);
        setSocialLinks(currentResume.socialLinks);
        setTechnicalSkills(currentResume.technicalSkills);
        setLanguages(currentResume.languages);
        setEducationEntries(currentResume.educationEntries);
        setExperienceEntries(currentResume.experienceEntries);
        setProjectEntries(currentResume.projectEntries);
        setCertificationEntries(currentResume.certificationEntries);
    }
  }, [currentResume])

  const handleNewResume = () => {
    const newResume: ResumeData = {
      id: `resume-${Date.now()}`,
      resumeName: 'Untitled Resume',
      name: 'Your Name',
      headline: '',
      email: '',
      phone: '',
      location: '',
      socialLinks: [],
      technicalSkills: [],
      languages: [],
      educationEntries: [],
      experienceEntries: [],
      projectEntries: [],
      certificationEntries: [],
    }
    setResumes([...resumes, newResume]);
    loadResumeIntoEditor(newResume);
  }

  const handleSaveResume = () => {
      const updatedResume: ResumeData = {
        ...currentResume,
        resumeName, name, headline, email, phone, location, socialLinks,
        technicalSkills, languages, educationEntries, experienceEntries,
        projectEntries, certificationEntries
      };

      const existingIndex = resumes.findIndex(r => r.id === updatedResume.id);
      
      if (existingIndex > -1) {
        // Update existing resume
        const updatedResumes = [...resumes];
        updatedResumes[existingIndex] = updatedResume;
        setResumes(updatedResumes);
      } else {
        // This case should ideally not happen with current flow, but as a fallback
        setResumes([...resumes, updatedResume]);
      }
      setCurrentResume(updatedResume);
      alert('Resume saved!');
  }

  const handleDeleteResume = (resumeId: string) => {
      if (resumes.length <= 1) {
        alert("You cannot delete the last resume.");
        return;
      }
      const updatedResumes = resumes.filter(r => r.id !== resumeId);
      setResumes(updatedResumes);
      if (currentResume.id === resumeId) {
          loadResumeIntoEditor(updatedResumes[0] || initialResumeData);
      }
      setActiveView('My Resumes');
  }


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
  
  const resumeData: ResumeData = {
    id: currentResume.id, resumeName, name, headline, email, phone, location, socialLinks,
    technicalSkills, languages, educationEntries, experienceEntries,
    projectEntries, certificationEntries
  }

  const handleDownloadPdf = () => {
    const input = resumePreviewRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      if (height > pdfHeight) {
         let position = 0;
         let pageHeight = (pdfWidth / canvas.width) * canvas.height;
         let heightLeft = pageHeight;

        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pageHeight);
        heightLeft -= pdfHeight;

        while(heightLeft > 0) {
          position = heightLeft - pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pageHeight);
          heightLeft -= pdfHeight;
        }

      } else {
         pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, height);
      }
     
      pdf.save('resume.pdf');
    });
  };

  const handleSetPortfolio = (resume: ResumeData) => {
    setPortfolioResume(resume);
  }

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

              <div className="px-2 pt-4 pb-2">
                  <Button className="w-full" onClick={handleNewResume}>
                      <FilePlus className="h-4 w-4 mr-2"/> New Resume
                  </Button>
              </div>

              {resumeSections.map((section) => (
                <Button
                  key={section.name}
                  variant={activeView === section.name ? 'secondary' : 'ghost'}
                  className="justify-start gap-3"
                  onClick={() => setActiveView(section.name)}
                >
                  <section.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{section.name}</span>
                </Button>
              ))}

              <Separator className="my-4"/>

                <div className='px-2'>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground px-2">PORTFOLIO ACTIONS</h3>
                    <div className="space-y-2 mt-4">
                        <Button className="w-full" variant="outline" onClick={() => setActiveView('Portfolio')}>
                            <LinkIcon className="h-4 w-4 mr-2"/>
                            Manage Public Portfolio
                        </Button>
                        <Button className="w-full">
                            <Upload className="h-4 w-4 mr-2"/>
                            Publish Changes
                        </Button>
                    </div>
                </div>

            </nav>
          </CardContent>
        </Card>
      </div>

      {/* Middle Content */}
      <div className="lg:col-span-9 xl:col-span-10">
        {activeView === 'Resume Builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1">
              <Card className="h-full">
                <CardHeader className="flex flex-row justify-between items-center">
                  <div className='flex-1'>
                      <Label htmlFor='resumeName'>Resume Name</Label>
                      <Input id="resumeName" value={resumeName} onChange={(e) => setResumeName(e.target.value)} placeholder="e.g. My Job Application" className="text-lg font-semibold tracking-tight border-0 shadow-none px-0 focus-visible:ring-0"/>
                  </div>
                    <div className='flex gap-2'>
                        <Button onClick={handleSaveResume}><Save className="mr-2 h-4 w-4"/>Save</Button>
                        <Button onClick={() => handleDeleteResume(currentResume.id)} variant="destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <nav className="flex items-center border-b overflow-x-auto">
                    {builderSections.map(section => (
                      <Button key={section.name} variant="ghost" size="sm" className={`flex-shrink-0 rounded-b-none border-b-2 ${activeSection === section.name ? 'border-primary' : 'border-transparent'}`} onClick={() => setActiveSection(section.name)}>
                        {section.name}
                      </Button>
                    ))}
                  </nav>

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
                              <h3 className="font-semibold text-base">{entry.institute}</h3>
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
                                  <h3 className="font-semibold text-base">{entry.title}</h3>
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
                              <h3 className="font-semibold text-base">{entry.name}</h3>
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
                              <h3 className="font-semibold text-base">{entry.title}</h3>
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
            
            {/* Resume Preview */}
            <div className="col-span-1">
              <Card className="sticky top-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleDownloadPdf}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </CardHeader>
                <CardContent className="h-[70vh] bg-secondary/30 rounded-b-lg p-6 overflow-y-auto">
                  <div ref={resumePreviewRef}>
                    {template === 'classic' && <ClassicTemplate {...resumeData} />}
                    {template === 'modern' && <ModernTemplate {...resumeData} />}
                    {template === 'minimal' && <MinimalTemplate {...resumeData} />}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeView === 'My Resumes' && (
          <Card className="h-full">
            <CardHeader>
              <CardTitle>My Resumes</CardTitle>
              <CardDescription>Select a resume to edit, or create a new one.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResumeList 
                    resumes={resumes} 
                    onSelectResume={loadResumeIntoEditor}
                    onDeleteResume={handleDeleteResume}
                />
            </CardContent>
          </Card>
        )}
        
        {activeView === 'Portfolio' && (
            <Card>
                <CardHeader>
                    <CardTitle>Build Your Public Portfolio</CardTitle>
                    <CardDescription>Select a resume to populate your portfolio. You can customize the content afterwards.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!portfolioResume ? (
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Step 1: Select a Resume</h3>
                             <ResumeList 
                                resumes={resumes} 
                                onSelectResume={handleSetPortfolio}
                                onDeleteResume={handleDeleteResume}
                            />
                        </div>
                    ) : (
                        <div>
                             <PortfolioView 
                                resumeData={portfolioResume} 
                                onDownloadPdf={handleDownloadPdf}
                                aboutMe={aboutMe}
                                setAboutMe={setAboutMe}
                                onClearPortfolio={() => setPortfolioResume(null)}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
