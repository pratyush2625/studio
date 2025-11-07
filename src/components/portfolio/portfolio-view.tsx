'use client';

import { useState } from 'react';
import {
  FileDown,
  Copy,
  Sparkles,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Share2,
  Undo2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { userSkills } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ResumeData } from '@/app/dashboard/portfolio/page';
import { suggestAboutMe } from '@/app/actions';
import { Input } from '../ui/input';

interface PortfolioViewProps {
    resumeData: ResumeData;
    aboutMe: string;
    setAboutMe: (value: string) => void;
    onDownloadPdf: () => void;
    onClearPortfolio: () => void;
}

export function PortfolioView({ resumeData, aboutMe, setAboutMe, onDownloadPdf, onClearPortfolio }: PortfolioViewProps) {
  const portfolioUrl = typeof window !== 'undefined' ? `${window.location.origin}/portfolio/${resumeData.name.toLowerCase().replace(/\s/g, '-')}` : '';
  const avatarImage = PlaceHolderImages.find(p => p.id === 'avatar');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerateAboutMe = async () => {
    setIsGenerating(true);
    const result = await suggestAboutMe({
        name: resumeData.name,
        headline: resumeData.headline,
        technicalSkills: resumeData.technicalSkills,
        experience: resumeData.experienceEntries,
        projects: resumeData.projectEntries,
    });
    if (result.aboutMeText) {
        setAboutMe(result.aboutMeText);
    } else if (result.error) {
        alert(result.error);
    }
    setIsGenerating(false);
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    });
  }
  
  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="font-semibold text-lg">Portfolio Preview</h3>
                <p className="text-muted-foreground text-sm">Based on: <span className="font-medium text-primary">{resumeData.resumeName}</span></p>
            </div>
            <Button variant="outline" onClick={onClearPortfolio}><Undo2 className="mr-2 h-4 w-4"/>Choose a different resume</Button>
        </div>
        
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Your Public Portfolio Link</CardTitle>
                <CardDescription>Share this link with employers, colleagues, and friends.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground"/>
                    <Input readOnly value={portfolioUrl} className="bg-secondary/40 border-0" />
                    <Button onClick={handleCopyLink} variant="outline" size="icon" className="shrink-0">
                        {copySuccess ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-3 border rounded-lg p-4 lg:p-8 bg-secondary/30">
            <div className="md:col-span-1 space-y-6">
                <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                    {avatarImage && (
                    <Image
                        src={avatarImage.imageUrl}
                        width={96}
                        height={96}
                        alt="User Avatar"
                        data-ai-hint={avatarImage.imageHint}
                        className="rounded-full mb-4"
                    />
                    )}
                    <h2 className="text-2xl font-bold">{resumeData.name}</h2>
                    <p className="text-muted-foreground">{resumeData.headline}</p>
                    <div className="flex items-center gap-4 mt-4">
                        {resumeData.socialLinks.find(l => l.platform === 'Twitter') && <Button variant="ghost" size="icon"><Twitter className="h-5 w-5"/></Button>}
                        {resumeData.socialLinks.find(l => l.platform === 'Github') && <Button variant="ghost" size="icon"><Github className="h-5 w-5"/></Button>}
                        {resumeData.socialLinks.find(l => l.platform === 'LinkedIn') && <Button variant="ghost" size="icon"><Linkedin className="h-5 w-5"/></Button>}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button className="flex-1" onClick={onDownloadPdf}>
                        <FileDown className='h-4 w-4 mr-2'/> Download Resume
                    </Button>
                    <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>About Me</CardTitle>
                        <Button size="sm" variant="ghost" onClick={handleGenerateAboutMe} disabled={isGenerating}>
                            <Sparkles className="mr-2 h-4 w-4"/>
                            {isGenerating ? 'Generating...' : 'AI Suggestion'}
                        </Button>
                    </CardHeader>
                    <CardContent>
                            <Textarea
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                            placeholder="Write a short bio about yourself..."
                            className="text-sm text-muted-foreground"
                            rows={5}
                        />
                    </CardContent>
                </Card>
                    <Card>
                    <CardHeader>
                        <CardTitle>My Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {resumeData.technicalSkills.map((skill) => {
                            const foundSkill = userSkills.find(s => s.name === skill);
                            return (
                            <div key={skill} className="space-y-2">
                                <div className="flex justify-between">
                                <span className="font-medium">{skill}</span>
                                <span className="text-sm text-muted-foreground">{foundSkill?.level || 50}%</span>
                                </div>
                                <Progress value={foundSkill?.level || 50} aria-label={`${skill} proficiency`} />
                            </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                    <Card>
                    <CardHeader>
                        <CardTitle>My Projects</CardTitle>
                        <CardDescription>A showcase of your best work, populated from your resume.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 sm:grid-cols-2">
                        {resumeData.projectEntries.map((project, index) => {
                            const projectImage = PlaceHolderImages.find(p => p.id === 'project-1');
                            return (
                                <Link href={project.link || '#'} key={index}>
                                <Card>
                                    <CardHeader className="p-0">
                                    {projectImage && (
                                        <Image
                                        src={projectImage.imageUrl}
                                        alt={project.name}
                                        width={600}
                                        height={400}
                                        data-ai-hint={projectImage.imageHint}
                                        className="rounded-t-lg object-cover aspect-[3/2]"
                                        />
                                    )}
                                    </CardHeader>
                                    <CardContent className="p-4">
                                    <h3 className="font-semibold">{project.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tech.split(',').map(tag => <Badge key={tag} variant="secondary">{tag.trim()}</Badge>)}
                                    </div>
                                    </CardContent>
                                </Card>
                                </Link>
                            );
                        })}
                    </CardContent>
                    </Card>
            </div>
            </div>
    </div>
  )
}
