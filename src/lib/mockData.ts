// Types mimicking our future Prisma schema

export type Bio = {
  id: string;
  name: string;
  tagline: string;
  bioText: string;
  avatarUrl: string | null;
  location: string;
  availability: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  badgeIcon: string | null;
  sortOrder: number;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  location: string;
  score: string;
  startDate: string;
  endDate: string;
  sortOrder: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  imageUrls: string[];
  sortOrder: number;
  category: 'work' | 'multiverse'; // Differentiate main projects vs design experiments
};

export type Startup = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  vision: string;
  websiteUrl: string | null;
};

export type Footprint = {
  id: string;
  githubUsername: string; // Used to fetch live API data
  leetcodeUsername: string | null;
  codeforcesUsername: string | null;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string | null;
  sortOrder: number;
};

export type ContactInfo = {
  email: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
};

// Mock Data

export const mockBio: Bio = {
  id: 'bio-1',
  name: 'Panvi',
  tagline: 'Full Stack Web Developer',
  bioText: 'I build interactive web experiences that blend solid engineering with creative design. Passionate about shipping products that users love.',
  avatarUrl: null,
  location: 'Bengaluru, India',
  availability: 'Available for work',
};

export const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Software Developer',
    company: 'eMudhra',
    startDate: '2022-01-01',
    endDate: 'Present',
    description: 'Working on core PKI solutions and enterprise software, improving performance and security.',
    badgeIcon: null,
    sortOrder: 1
  }
];

export const mockEducation: Education[] = [
  {
    id: 'edu-1',
    institution: 'University Name',
    degree: 'B.Tech in Computer Science',
    location: 'Bengaluru',
    score: '9.0 CGPA',
    startDate: '2018',
    endDate: '2022',
    sortOrder: 1
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Gamified Task Manager',
    description: 'A productivity app where completing tasks earns you XP.',
    techStack: ['Next.js', 'Tailwind', 'Zustand', 'PostgreSQL'],
    liveUrl: 'https://example.com/task',
    repoUrl: 'https://github.com/example/task',
    imageUrls: [],
    sortOrder: 1,
    category: 'work'
  },
  {
    id: 'proj-2',
    title: 'Retro Arcade Portfolio',
    description: 'An experimental 8-bit design exploration.',
    techStack: ['React', 'CSS'],
    liveUrl: null,
    repoUrl: null,
    imageUrls: [],
    sortOrder: 2,
    category: 'multiverse'
  }
];

export const mockStartup: Startup = {
  id: 'startup-1',
  name: 'Covey',
  tagline: 'Figma for coding agents',
  description: 'A stealth-mode startup revolutionizing how developers interact with autonomous coding agents in a visual workspace.',
  techStack: ['Next.js', 'WebSockets', 'AI'],
  vision: 'To bridge the gap between design and autonomous code generation.',
  websiteUrl: null
};

export const mockFootprint: Footprint = {
  id: 'foot-1',
  githubUsername: 'Panvi', // Replace with actual later
  leetcodeUsername: 'Panvi',
  codeforcesUsername: 'Panvi'
};

export const mockSkills: Skill[] = [
  { id: 'skill-1', name: 'TypeScript', category: 'Frontend', level: 90, icon: null, sortOrder: 1 },
  { id: 'skill-2', name: 'React / Next.js', category: 'Frontend', level: 85, icon: null, sortOrder: 2 },
  { id: 'skill-3', name: 'Node.js', category: 'Backend', level: 75, icon: null, sortOrder: 3 },
  { id: 'skill-4', name: 'PostgreSQL', category: 'Backend', level: 70, icon: null, sortOrder: 4 },
];

export const mockContact: ContactInfo = {
  email: 'hello@example.com',
  resumeUrl: '/resume.pdf',
  socialLinks: {
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
    twitter: 'https://twitter.com/example'
  }
};
