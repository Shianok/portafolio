'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const BOOT_LINES = [
  { text: 'BIOS v2.4.0 — oarce_dev Terminal OS',       color: 'dim',   delay: 0 },
  { text: '',                                            color: 'dim',   delay: 200 },
  { text: '> system --init',                             color: 'green', delay: 400 },
  { text: '',                                            color: 'dim',   delay: 600 },
  { text: 'Cargando módulos del sistema...',             color: 'dim',   delay: 800 },
  { text: '',                                            color: 'dim',   delay: 900 },
  { text: '  [██████████] ████░░░░░░  40%  skills.sys',  color: 'green', delay: 1000 },
  { text: '  [██████████] ████████░░  80%  projects.db', color: 'green', delay: 1500 },
  { text: '  [██████████] ██████████ 100%  profile.json',color: 'green', delay: 2000 },
  { text: '  [██████████] ██████████ 100%  contact.ssh', color: 'green', delay: 2400 },
  { text: '',                                            color: 'dim',   delay: 2700 },
  { text: '✓ MODULE: skills.sys      → LOADED',         color: 'green', delay: 2900 },
  { text: '✓ MODULE: projects.db     → LOADED',         color: 'green', delay: 3100 },
  { text: '✓ MODULE: profile.json    → LOADED',         color: 'green', delay: 3300 },
  { text: '✓ MODULE: contact.ssh     → READY',          color: 'amber', delay: 3500 },
  { text: '',                                            color: 'dim',   delay: 3700 },
  { text: '──────────────────────────────────────────────', color: 'dim', delay: 3900 },
  { text: 'Conexión establecida. Bienvenido, visitante.', color: 'green', delay: 4100 },
  { text: "Escribe 'help' para ver los comandos disponibles.", color: 'dim', delay: 4300 },
  { text: '',                                            color: 'dim',   delay: 4500 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });

    // Complete
    const total = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 400);
    }, BOOT_LINES[BOOT_LINES.length - 1].delay + 600);
    timers.push(total);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const colorClass = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-neon';
      case 'amber': return 'text-amber';
      case 'dim':   return 'text-gray-light';
      default:      return 'text-green-neon';
    }
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm leading-relaxed"
        >
          {BOOT_LINES.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={colorClass(line.color)}
                >
                  {line.text || <>&nbsp;</>}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
