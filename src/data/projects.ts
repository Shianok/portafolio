export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  architecture?: string[];
  tech: string[];
  status: 'active' | 'completed' | 'wip';
  featured: boolean;
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'electric_axend',
    name: 'Electric_axend',
    tagline: 'Plataforma de servicios profesionales — .NET 8 Web API',
    description: [
      'Aplicación empresarial para la gestión y contratación de servicios',
      'profesionales. Conecta proveedores de servicios con clientes mediante',
      'un sistema de perfiles, reservas, pagos y calificaciones.',
    ],
    architecture: [
      'Clean Architecture (Domain / Application / Infrastructure / API)',
      'ASP.NET Core 8 Web API con autenticación JWT Bearer',
      'Entity Framework Core 8 — Code First + Migrations',
      'SQL Server como motor de base de datos principal',
      'Repository Pattern + Unit of Work para acceso a datos',
      'MediatR para CQRS (Commands & Queries separados)',
      'FluentValidation para validación de entidades de dominio',
      'Swagger/OpenAPI para documentación del API',
    ],
    tech: ['.NET 8', 'C#', 'Entity Framework Core', 'SQL Server', 'JWT', 'MediatR', 'Clean Architecture'],
    status: 'active',
    featured: true,
    repo: 'https://github.com/Shianok/electric_axend',
  },
  {
    id: 'rpa_automation',
    name: 'RPA_Suite',
    tagline: 'Suite de automatización de procesos empresariales',
    description: [
      'Colección de bots RPA desarrollados en Power Platform y Robocorp',
      'para automatizar procesos repetitivos en entornos corporativos.',
      'Incluye documentación PDD/SDD y reportes de métricas de eficiencia.',
    ],
    tech: ['Power Automate', 'Robocorp', 'Python', 'PDD', 'SDD'],
    status: 'completed',
    featured: false,
  },
  {
    id: 'django_api',
    name: 'Django_REST_Core',
    tagline: 'API REST modular con Python y Django',
    description: [
      'Backend API REST construido con Django REST Framework.',
      'Implementa autenticación por tokens, permisos granulares y',
      'un sistema de módulos desacoplado para fácil extensión.',
    ],
    tech: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL'],
    status: 'completed',
    featured: false,
  },
];

export const featuredProject = projects.find(p => p.featured) ?? projects[0];
