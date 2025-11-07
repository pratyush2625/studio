
import type { ResumeData } from '@/app/dashboard/portfolio/page';

export function MinimalTemplate({
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
    <div className="bg-white p-8 rounded-lg shadow-md h-full text-sm font-sans text-gray-700">
        <h1 className="text-3xl font-light tracking-wider">{name}</h1>
        <p className="text-md mt-1 tracking-wide">{headline}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs mt-4">
            <span>{email}</span>
            <span>{phone}</span>
            <span>{location}</span>
            {socialLinks.map(link => (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary">{link.platform}</a>
            ))}
        </div>

        {experienceEntries.length > 0 && (
            <div className="mt-8">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Experience</h2>
                <div className="space-y-5">
                    {experienceEntries.map((entry, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-base">{entry.title}</h3>
                                <p className="text-xs text-gray-500">{entry.duration}</p>
                            </div>
                            <p className="font-medium">{entry.company}</p>
                            <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">{entry.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {projectEntries.length > 0 && (
            <div className="mt-8">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Projects</h2>
                <div className="space-y-4">
                    {projectEntries.map((entry, index) => (
                        <div key={index}>
                             <h3 className="font-semibold text-base">{entry.name} <span className="text-sm font-light text-gray-500 ml-2">({entry.tech})</span></h3>
                             <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">{entry.description}</p>
                             <a href={entry.link} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">View Project</a>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {educationEntries.length > 0 && (
            <div className="mt-8">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Education</h2>
                <div className="space-y-3">
                    {educationEntries.map((entry, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-base">{entry.institute}</h3>
                                <p className="text-xs text-gray-500">{entry.startYear} - {entry.endYear}</p>
                            </div>
                            <p className="text-sm">{entry.degree}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {(technicalSkills.length > 0 || languages.length > 0) && (
            <div className="mt-8">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Skills & Languages</h2>
                <div className="text-sm">
                    {technicalSkills.length > 0 && <p><span className="font-semibold">Skills:</span> {technicalSkills.join(' | ')}</p>}
                    {languages.length > 0 && <p className='mt-1'><span className="font-semibold">Languages:</span> {languages.join(' | ')}</p>}
                </div>
            </div>
        )}
    </div>
  )
}
