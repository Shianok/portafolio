import { profile } from '../data/profile';
import { projects } from '../data/projects';

export type CommandOutput =
  | { type: 'text';    content: string; color?: string }
  | { type: 'section'; title: string;  items: string[] }
  | { type: 'table';   rows: [string, string][] }
  | { type: 'contact'; }
  | { type: 'clear'; }
  | { type: 'easter'; };

export interface CommandResult {
  input: string;
  output: CommandOutput[];
}

const HELP_TEXT: CommandOutput[] = [
  { type: 'text', content: '╔══════════════════════════════════════════════════╗', color: 'dim' },
  { type: 'text', content: '║         COMANDOS DISPONIBLES — oarce_dev         ║', color: 'dim' },
  { type: 'text', content: '╚══════════════════════════════════════════════════╝', color: 'dim' },
  { type: 'table', rows: [
    ['whoami',               'Muestra el perfil del desarrollador'],
    ['skills',               'Lista de tecnologías y nivel de dominio'],
    ['projects',             'Proyectos desarrollados'],
    ['project <id>',         'Detalles de un proyecto (ej: project electric_axend)'],
    ['contact',              'Abrir formulario de contacto'],
    ['langs',                'Idiomas del desarrollador'],
    ['interests',            'Intereses personales'],
    ['clear',                'Limpiar terminal'],
    ['sudo hire oscar',      '???'],
  ]},
  { type: 'text', content: '' },
  { type: 'text', content: 'TIP: Usa ↑ / ↓ para navegar el historial de comandos.', color: 'dim' },
];

function parseCommand(raw: string): CommandResult {
  const input = raw.trim();
  const lower = input.toLowerCase();

  // CLEAR
  if (lower === 'clear') {
    return { input, output: [{ type: 'clear' }] };
  }

  // HELP
  if (lower === 'help' || lower === '?') {
    return { input, output: HELP_TEXT };
  }

  // WHOAMI
  if (lower === 'whoami') {
    return {
      input,
      output: [
        { type: 'text', content: `> ${profile.name}`, color: 'green' },
        { type: 'text', content: `> ${profile.role}`, color: 'amber' },
        { type: 'text', content: '' },
        ...profile.bio.map(line => ({ type: 'text' as const, content: `  ${line}` })),
        { type: 'text', content: '' },
        { type: 'text', content: `  GitHub: ${profile.contact.github}`, color: 'blue' },
      ],
    };
  }

  // SKILLS
  if (lower === 'skills') {
    const bars = profile.skills.map(s => {
      const filled = Math.round(s.level / 10);
      const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
      return [`  ${s.name.padEnd(22)}`, `[${bar}] ${s.level}%  (${s.category})`] as [string, string];
    });
    return {
      input,
      output: [
        { type: 'text', content: '── SKILLS.SYS ──────────────────────────────────', color: 'dim' },
        { type: 'table', rows: bars },
      ],
    };
  }

  // PROJECTS (list)
  if (lower === 'projects') {
    return {
      input,
      output: [
        { type: 'text', content: '── PROJECTS.DB ─────────────────────────────────', color: 'dim' },
        { type: 'table', rows: projects.map(p => [
          `  [${p.featured ? '★' : ' '}] ${p.id}`,
          `${p.tagline} [${p.status.toUpperCase()}]`,
        ]) },
        { type: 'text', content: '' },
        { type: 'text', content: "  Usa: project <id>  para ver detalles (ej: project electric_axend)", color: 'dim' },
      ],
    };
  }

  // PROJECT <id>
  if (lower.startsWith('project ')) {
    const id = lower.replace('project ', '').trim();
    const p = projects.find(x => x.id === id);
    if (!p) {
      return {
        input,
        output: [
          { type: 'text', content: `Error: proyecto '${id}' no encontrado.`, color: 'error' },
          { type: 'text', content: "Usa 'projects' para ver la lista.", color: 'dim' },
        ],
      };
    }
    const out: CommandOutput[] = [
      { type: 'text', content: `╔═ ${p.name} ${'═'.repeat(Math.max(0, 44 - p.name.length))}╗`, color: 'amber' },
      { type: 'text', content: `║  ${p.tagline}`, color: 'amber' },
      { type: 'text', content: `╚${'═'.repeat(48)}╝`, color: 'amber' },
      { type: 'text', content: '' },
      { type: 'text', content: '  DESCRIPCIÓN:', color: 'dim' },
      ...p.description.map(l => ({ type: 'text' as const, content: `    ${l}` })),
    ];
    if (p.architecture) {
      out.push({ type: 'text', content: '' });
      out.push({ type: 'text', content: '  ARQUITECTURA:', color: 'dim' });
      p.architecture.forEach(a => out.push({ type: 'text', content: `    ▶ ${a}` }));
    }
    out.push({ type: 'text', content: '' });
    out.push({ type: 'text', content: '  TECNOLOGÍAS:', color: 'dim' });
    out.push({ type: 'text', content: `    ${p.tech.join('  ·  ')}`, color: 'blue' });
    if (p.repo) {
      out.push({ type: 'text', content: '' });
      out.push({ type: 'text', content: `  REPO: ${p.repo}`, color: 'blue' });
    }
    return { input, output: out };
  }

  // LANGS
  if (lower === 'langs' || lower === 'languages') {
    return {
      input,
      output: [
        { type: 'text', content: '── LANGUAGES ───────────────────────────────────', color: 'dim' },
        { type: 'table', rows: profile.languages.map(l => [
          `  ${l.lang.padEnd(12)}`,
          l.level,
        ]) },
      ],
    };
  }

  // INTERESTS
  if (lower === 'interests') {
    return {
      input,
      output: [
        { type: 'text', content: '── INTERESTS ───────────────────────────────────', color: 'dim' },
        ...profile.interests.map(i => ({
          type: 'text' as const,
          content: `  ${i.icon}  ${i.label}`,
        })),
      ],
    };
  }

  // CONTACT
  if (lower === 'contact') {
    return { input, output: [{ type: 'contact' }] };
  }

  // EASTER EGG
  if (lower === 'sudo hire oscar') {
    return { input, output: [{ type: 'easter' }] };
  }

  // UNKNOWN
  return {
    input,
    output: [
      { type: 'text', content: `bash: ${input}: command not found`, color: 'error' },
      { type: 'text', content: "Escribe 'help' para ver los comandos disponibles.", color: 'dim' },
    ],
  };
}

export default parseCommand;
