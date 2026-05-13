'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import parseCommand, { type CommandResult, type CommandOutput } from './CommandParser';
import BootSequence from './BootSequence';
import ContactForm from './ContactForm';

interface TerminalProps {
  base: string;
}

const PROMPT = 'visitor@oarce_dev:~$';

function renderOutput(output: CommandOutput, base: string, onClose: () => void, onContactClose: () => void) {
  if (output.type === 'contact') {
    return <ContactForm base={base} onClose={onContactClose} />;
  }
  if (output.type === 'easter') {
    return (
      <div className="my-2 border border-amber/40 p-3 text-amber text-sm">
        <div>⚡ SUDO OVERRIDE DETECTED</div>
        <div className="mt-1 text-amber/70">Procesando solicitud de contratación...</div>
        <div className="mt-1 text-green-neon">✓ ¡Excelente decisión! Oscar está disponible para nuevos proyectos.</div>
        <div className="text-green-neon/60 text-xs mt-1">  → Usa 'contact' para iniciar el proceso.</div>
      </div>
    );
  }
  if (output.type === 'table') {
    return (
      <div className="font-mono text-sm">
        {output.rows.map(([a, b], i) => (
          <div key={i} className="flex gap-2">
            <span className="text-green-neon/80 whitespace-pre">{a}</span>
            <span className="text-gray-light">{b}</span>
          </div>
        ))}
      </div>
    );
  }
  if (output.type === 'section') {
    return (
      <div>
        <div className="text-amber text-sm mb-1">{output.title}</div>
        {output.items.map((item, i) => (
          <div key={i} className="text-sm text-green-neon/80 pl-2">{item}</div>
        ))}
      </div>
    );
  }
  // text
  const colorMap: Record<string, string> = {
    green:   'text-green-neon',
    amber:   'text-amber',
    dim:     'text-gray-light',
    blue:    'text-blue-term',
    error:   'text-red-term',
    success: 'text-green-neon font-bold',
  };
  const cls = output.color ? colorMap[output.color] ?? 'text-green-neon' : 'text-green-neon';
  return <div className={`text-sm ${cls} whitespace-pre-wrap`}>{output.text ?? '\u00a0'}</div>;
}

export default function Terminal({ base }: TerminalProps) {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<CommandOutput[]>([]);
  const [history, setHistory] = useState<CommandResult[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showContact, setShowContact] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, booted]);

  // Focus input when clicking anywhere on terminal
  const focusInput = () => inputRef.current?.focus();

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const submitCommand = useCallback((raw: string) => {
    if (!raw.trim()) return;
    const result = parseCommand(raw);

    if (result.output[0]?.type === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (result.output[0]?.type === 'contact') {
      setShowContact(true);
    }

    setHistory(h => [...h, result]);
    setCmdHistory(h => [raw, ...h]);
    setHistoryIdx(-1);
    setInput('');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = historyIdx + 1;
      if (idx < cmdHistory.length) {
        setHistoryIdx(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = historyIdx - 1;
      if (idx < 0) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const cmds = ['help', 'whoami', 'skills', 'projects', 'contact', 'langs', 'interests', 'clear', 'sudo hire oscar', 'project electric_axend'];
      const match = cmds.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col pt-12 pb-4 px-4 md:px-8 cursor-text"
      onClick={focusInput}
    >
      {/* Boot sequence */}
      {!booted && (
        <div className="flex-1 pt-8">
          <BootSequence onComplete={handleBootComplete} />
        </div>
      )}

      {/* Command history */}
      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 pt-6 space-y-1"
        >
          {history.map((result, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              {/* Command line */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-neon/60 select-none">{PROMPT}</span>
                <span className="text-green-neon">{result.input}</span>
              </div>
              {/* Output lines */}
              <div className="pl-2 mt-1 space-y-0.5">
                {result.output.map((out, oi) => (
                  <div key={oi}>
                    {renderOutput(out, base, () => {}, () => setShowContact(false))}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Active input line */}
          <div className="flex items-center gap-2 text-sm mt-2">
            <span className="text-green-neon/60 select-none">{PROMPT}</span>
            <div className="flex items-center flex-1">
              <span className="text-green-neon">{input}</span>
              <span className="cursor-blink" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 w-0 h-0"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
          <div ref={bottomRef} />
        </motion.div>
      )}
    </div>
  );
}
