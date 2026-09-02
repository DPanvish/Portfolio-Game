// Shared node list used by both MainScene and GameHUD
import { mockExperiences, mockProjects, mockSkills, mockEducation, mockStartup, mockFootprint } from '@/lib/data';

export const allNodes = [
  ...mockExperiences.map(e => ({ type: 'experience', data: e })),
  ...mockEducation.map(e   => ({ type: 'education',  data: e })),
  ...mockProjects.map(p   => ({ type: 'project',    data: p })),
  { type: 'startup',   data: mockStartup },
  { type: 'footprint', data: mockFootprint },
  ...mockSkills.map(s     => ({ type: 'skill',      data: s })),
];
