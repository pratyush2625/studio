
import { Badge } from '@/components/ui/badge';
import type { ResumeData } from '@/app/dashboard/portfolio/page';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export function ModernTemplate({
    name,
    headline,
    location,
    phone,
    email,
    socialLinks,
    technicalSkills,
    languages,
    educationEntries,
    experienceEntries,
    projectEntries,
    certificationEntries,
}: ResumeData) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md h-full text-sm font-sans flex gap-8">
        <aside className="w-1/3 bg-secondary/40 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-primary">{name}</h2>
            <h3 className="text-sm text-muted-foreground font-medium">{headline}</h3>
            
            <div className="mt-6 space-y-3 text-xs">
                <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-primary" /> <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-primary" /> <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-primary" /> <span>{location}</span>
                </div>
                 {socialLinks.map(link => (
                    <div key={link.platform} className="flex items-center gap-2">
                        {link.platform === 'LinkedIn' && <Linkedin className="h-3 w-3 text-primary" />}
                        {link.platform === 'Github' && <Github className="h-3 w-3 text-primary" />}
                         <a href={link.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{link.platform}</a>
                    </div>
                ))}
            </div>

            {technicalSkills.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-bold text-primary tracking-wide">Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {technicalSkills.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                    </div>
                </div>
            )}
            {languages.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-bold text-primary tracking-wide">Languages</h4>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {languages.map((lang, index) => (
                            <Badge key={index} variant="outline">{lang}</Badge>
                        ))}
                    </div>
                </div>
            )}
        </aside>

        <main className="w-2/3">
             {experienceEntries.length > 0 && (
                <div>
                    <h4 className="font-bold text-lg text-primary tracking-wide border-b-2 border-primary pb-1">Experience</h4>
                    <div className="space-y-4 mt-3">
                        {experienceEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="font-semibold">{entry.title} @ {entry.company}</h5>
                                    <p className="text-xs text-muted-foreground">{entry.duration}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{entry.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {projectEntries.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-bold text-lg text-primary tracking-wide border-b-2 border-primary pb-1">Projects</h4>
                    <div className="space-y-4 mt-3">
                        {projectEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="font-semibold">{entry.name}</h5>
                                    <a href={entry.link} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">View Project</a>
                                </div>
                                <p className="text-sm text-muted-foreground">{entry.tech}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {educationEntries.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-bold text-lg text-primary tracking-wide border-b-2 border-primary pb-1">Education</h4>
                    <div className="space-y-3 mt-3">
                        {educationEntries.map((entry, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="font-semibold">{entry.degree}</h5>
                                    <p className="text-xs text-muted-foreground">{entry.startYear} - {entry.endYear}</p>
                                </div>
                                <p className="text-muted-foreground">{entry.institute}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    </div>
  )
}
