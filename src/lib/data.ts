import type { Course, Skill, Project, Event, Internship } from './types';

export const userSkills: Skill[] = [
  { name: 'React', level: 75 },
  { name: 'Next.js', level: 60 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js', level: 50 },
  { name: 'Python', level: 40 },
  { name: 'UI/UX Design', level: 65 },
];

export const recommendedCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React & Next.js',
    platform: 'Udemy',
    description: 'Master the full-stack with advanced patterns in React and Next.js 14.',
    imageId: 'course-react',
    url: '#',
  },
  {
    id: '2',
    title: 'Python for Data Science and ML',
    platform: 'Coursera',
    description: 'Go from beginner to advanced in Python for data analysis and machine learning.',
    imageId: 'course-python',
    url: '#',
  },
  {
    id: '3',
    title: 'Machine Learning A-Z',
    platform: 'Udemy',
    description: 'Learn to create Machine Learning algorithms in Python and R from two Data Science experts.',
    imageId: 'course-ml',
    url: '#',
  },
  {
    id: '4',
    title: 'Data Structures & Algorithms',
    platform: 'Pluralsight',
    description: 'A deep dive into the fundamental building blocks of modern software.',
    imageId: 'course-ds',
    url: '#',
  },
];

export const allCourses: Course[] = [
  ...recommendedCourses,
  {
    id: '5',
    title: 'UI & UX Design Specialization',
    platform: 'Coursera',
    description: 'Learn the entire product design process from research to high-fidelity prototypes.',
    imageId: 'course-ux',
    url: '#',
  },
  {
    id: '6',
    title: 'Node.js, Express, MongoDB & More',
    platform: 'Udemy',
    description: 'Build and deploy RESTful APIs for your full-stack applications.',
    imageId: 'course-node',
    url: '#',
  }
]

export const userProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce website built with Next.js, Stripe, and PostgreSQL.',
    imageId: 'project-3',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    url: '#',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A responsive web app for managing tasks and projects, featuring drag-and-drop.',
    imageId: 'project-1',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    url: '#',
  },
  {
    id: '3',
    title: 'Mobile Fitness Tracker',
    description: 'A React Native application for tracking workouts and daily activity.',
    imageId: 'project-2',
    tags: ['React Native', 'Expo', 'Zustand'],
    url: '#',
  },
];

export const recommendedEvents: Event[] = [
    {
        id: 'event-rec-1',
        title: 'AI for Good Hackathon',
        category: 'Hackathon',
        date: '2024-10-15',
        description: 'Use your AI skills to solve real-world problems for social impact.',
        teamSize: { min: 2, max: 4 },
        imageId: 'event-1',
        url: '#',
    }
];

export const allEvents: Event[] = [
    {
        id: 'event-1',
        title: 'Web Dev Weekend Workshop',
        category: 'Workshop',
        date: '2024-09-20',
        description: 'A 2-day workshop covering the latest trends in web development with React and Next.js.',
        teamSize: { min: 1, max: 1 },
        imageId: 'event-2',
        url: '#',
    },
    {
        id: 'event-2',
        title: 'Cloud Native Ideathon',
        category: 'Ideathon',
        date: '2024-11-01',
        description: 'Pitch your innovative ideas using cloud-native technologies and win exciting prizes.',
        teamSize: { min: 1, max: 3 },
        imageId: 'event-3',
        url: '#',
    },
    {
        id: 'event-3',
        title: 'Intro to Machine Learning',
        category: 'Webinar',
        date: '2024-09-25',
        description: 'A free webinar for beginners to get started with the fundamentals of Machine Learning.',
        teamSize: { min: 1, max: 1 },
        imageId: 'event-4',
        url: '#',
    }
];

export const allInternships: Internship[] = [
    {
        id: 'intern-1',
        title: 'Frontend Developer Intern',
        company: 'Innovate Inc.',
        location: 'Remote',
        duration: '3 months',
        description: 'Work with our frontend team to build and maintain user-facing features on our flagship product.',
        tags: ['React', 'TypeScript', 'Next.js'],
        url: '#',
    },
    {
        id: 'intern-2',
        title: 'Data Science Intern',
        company: 'DataDriven Co.',
        location: 'New York, NY',
        duration: '6 months',
        description: 'Analyze large datasets, build predictive models, and contribute to our data strategy.',
        tags: ['Python', 'Pandas', 'SQL'],
        url: '#',
    },
     {
        id: 'intern-3',
        title: 'UX Design Intern',
        company: 'Creative Solutions',
        location: 'Remote',
        duration: '4 months',
        description: 'Collaborate with product managers and engineers to design intuitive and engaging user experiences.',
        tags: ['Figma', 'User Research', 'Prototyping'],
        url: '#',
    }
]
