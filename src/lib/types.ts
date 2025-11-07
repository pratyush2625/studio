export type Course = {
  id: string;
  title: string;
  platform: 'Udemy' | 'Coursera' | 'edX' | 'Pluralsight';
  description: string;
  imageId: string;
  url: string;
};

export type Skill = {
  name: string;
  level: number; // 0-100
};

export type Project = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  tags: string[];
  url: string;
};

export type LearningPathStep = {
  step: number;
  title: string;
  description: string;
  resources: string[];
  url: string;
};

export type Event = {
  id: string;
  title: string;
  category: 'Hackathon' | 'Workshop' | 'Webinar' | 'Ideathon';
  date: string;
  description: string;
  teamSize: { min: number; max: number };
  imageId: string;
  url: string;
}

export type Internship = {
    id: string;
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string;
    tags: string[];
    url: string;
}


// From portfolio/page.tsx
export type SocialLink = { platform: string; url: string };
export type Education = { institute: string; degree: string; startYear: string; endYear: string; gpa: string };
export type Experience = { company: string; title: string; duration: string; description: string };
export type ProjectEntry = { name: string; tech: string; link: string; description: string };
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
    projectEntries: ProjectEntry[];
    certificationEntries: Certification[];
}
