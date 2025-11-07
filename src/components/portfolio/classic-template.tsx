
import { Badge } from '@/components/ui/badge';
import type { ResumeData } from '@/app/dashboard/portfolio/page';

export function ClassicTemplate({
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
    <div className="bg-white p-8 rounded-lg shadow-md h-full text-sm font-serif">
        <h3 className="text-2xl font-bold text-center">{name}</h3>
        <p className="text-muted-foreground mt-1 text-center">{headline}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
            <span>{location}</span>
            <span>{phone}</span>
            <span>{email}</span>
            {socialLinks.map(link => (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{link.url}</a>
            ))}
        </div>

        {technicalSkills.length > 0 && (
            <div className="mt-6">
                <h4 className="font-bold text-primary text-sm tracking-widest uppercase text-center">Skills</h4>
                <div className="w-full h-px bg-border my-2"></div>
                <div className="text-center">
                    <p className="font-semibold">Technical Skills: <span className="font-normal">{technicalSkills.join(', ')}</span></p>
                </div>
            </div>
        )}
        
        {languages.length > 0 && (
            <div className="mt-2">
                 <div className="text-center">
                    <p className="font-semibold">Languages: <span className="font-normal">{languages.join(', ')}</span></p>
                </div>
            </div>
        )}

        {educationEntries.length > 0 && (
        <div className="mt-6">
            <h4 className="font-bold text-primary text-sm tracking-widest uppercase text-center">Education</h4>
            <div className="w-full h-px bg-border my-2"></div>
            <div className="space-y-3">
                {educationEntries.map((entry, index) => (
                    <div key={index} className="text-center">
                        <h5 className="font-semibold">{entry.institute}</h5>
                        <div className="flex justify-center items-baseline gap-4">
                            <p className="text-muted-foreground">{entry.degree}</p>
                            <p className="text-xs text-muted-foreground">{entry.startYear} - {entry.endYear}</p>
                        </div>
                        {entry.gpa && <p className="text-xs text-muted-foreground">GPA: {entry.gpa}</p>}
                    </div>
                ))}
            </div>
        </div>
        )}
        
        {experienceEntries.length > 0 && (
        <div className="mt-6">
            <h4 className="font-bold text-primary text-sm tracking-widest uppercase text-center">Experience</h4>
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
            <h4 className="font-bold text-primary text-sm tracking-widest uppercase text-center">Projects</h4>
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
            <h4 className="font-bold text-primary text-sm tracking-widest uppercase text-center">Certifications</h4>
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
  )
}
