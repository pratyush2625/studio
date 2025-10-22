import type { Course, Skill, Project } from '@/lib/types';

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
