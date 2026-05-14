export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  architecture?: string[];
  tech: string[];
  status: 'active' | 'completed' | 'WIP';
  featured: boolean;
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'Service_App',
    name: 'Service App',
    tagline: 'Professional services platform',
    description: [
      'Enterprise application for managing and contracting professional',
      'services. Connects service providers with clients through',
      'a system of profiles, reservations, payments and ratings.',
    ],
    architecture: [
      'Clean Architecture (Domain / Application / Infrastructure / API)',
      'Repository Pattern + Unit of Work for data access',

    ],
    tech: ['Python', 'Django REST Framework', 'PostgreSQL', 'Clean Architecture'],
    status: 'WIP',
    featured: true,
    repo: 'https://github.com/Deam147/ServicesApp',
  },
  {
    id: 'rpa_automation',
    name: 'RPA Suite',
    tagline: 'Enterprise process automation suite',
    description: [
      'Collection of RPA bots developed in Power Platform and Robocorp',
      'to automate repetitive processes in corporate environments.',
      'Includes PDD/SDD documentation and efficiency metrics reports.',
    ],
    tech: ['Power Automate', 'Robocorp', 'Python', 'PDD', 'SDD'],
    status: 'completed',
    featured: false,
  },
  {
    id: 'Medical_Test_App',
    name: 'Medical Test App',
    tagline: 'Modular REST API with Python and Django',
    description: [
      'desktop application developed using Visual Basic .NET (VB.NET).',
      'This project is designed to facilitate medical service management',
      'focusing on administrative workflows and record organization within a .NET environment.',
    ],
    tech: ['Visual Basic', 'Visual Studio'],
    status: 'completed',
    featured: true,
    repo: 'https://github.com/Shianok/Medical_Service_App',
  },
  {
    id: 'Personal_Health',
    name: 'Personal Health',
    tagline: 'A personal health and wellness management platform',
    description: [
      'web application developed using the .NET (C#) ecosystem.',
      'The project is designed as a personal health and wellness management platform',
      'allowing users to track physical activities, nutrition, and medical records.',
    ],
    tech: ['C# (.NET Framework/Core)', 'HTML5', 'CSS3', 'IIS', 'NuGet'],
    status: 'completed',
    featured: true,
    repo: 'https://github.com/Shianok/Personal_Health',
  },
];

export const featuredProject = projects.find(p => p.featured) ?? projects[0];
