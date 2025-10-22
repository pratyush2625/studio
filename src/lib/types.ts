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
};
