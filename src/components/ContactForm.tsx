'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface ContactFormProps {
  base: string;
  onClose: () => void;
}

const SSH_STEPS = [
  'Iniciando handshake SSH...',
  'Cifrando paquete con RSA-4096...',
  'Estableciendo túnel seguro...',
  'Transmitiendo datos...',
];

export default function ContactForm({ base, onClose }: ContactFormProps) {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [phase, setPhase] = useState<'form' | 'sending' | 'success' | 'error'>('form');
  const [sshStep, setSshStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('sending');

    // Animate SSH steps
    for (let i = 0; i < SSH_STEPS.length; i++) {
      setSshStep(i);
      await new Promise(r => setTimeout(r, 500));
    }

    try {
      const res = await fetch(`${base}api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (data.success) {
        setPhase('success');
      } else {
        setErrorMsg(data.error ?? 'Error desconocido.');
        setPhase('error');
      }
    } catch {
      setErrorMsg('No se pudo conectar al servidor.');
      setPhase('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="my-2 border border-green-neon/40 p-4 bg-terminal-bg-alt"
      style={{ fontFamily: 'JetBrains Mono, monospace' }}
    >
      <div className="text-green-neon/50 text-xs mb-3">
        ╔══ SSH CONTACT FORM ════════════════════════╗
      </div>

      <AnimatePresence mode="wait">
        {phase === 'form' && (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {(['name', 'email', 'message'] as const).map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <label className="text-xs text-green-neon/60">
                  {field === 'name' ? '> nombre' : field === 'email' ? '> email' : '> mensaje'}
                </label>
                {field === 'message' ? (
                  <textarea
                    rows={3}
                    value={fields.message}
                    onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                    required
                    className="bg-transparent border border-green-neon/30 text-green-neon text-sm px-2 py-1 focus:outline-none focus:border-green-neon/80 resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                ) : (
                  <input
                    ref={field === 'name' ? inputRef : undefined}
                    type={field === 'email' ? 'email' : 'text'}
                    value={fields[field]}
                    onChange={e => setFields(f => ({ ...f, [field]: e.target.value }))}
                    required
                    className="bg-transparent border border-green-neon/30 text-green-neon text-sm px-2 py-1 focus:outline-none focus:border-green-neon/80"
                    placeholder={field === 'email' ? 'tu@email.com' : 'Tu nombre'}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                className="text-sm border border-green-neon/60 px-4 py-1 hover:bg-green-neon hover:text-terminal-bg transition-colors cursor-pointer"
              >
                [ENVIAR_PAQUETE]
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-green-neon/40 hover:text-green-neon/80 transition-colors cursor-pointer"
              >
                [CANCELAR]
              </button>
            </div>
          </motion.form>
        )}

        {phase === 'sending' && (
          <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
            {SSH_STEPS.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: i <= sshStep ? 1 : 0 }}
                className="text-sm flex items-center gap-2"
              >
                <span className="text-green-neon/40">{i < sshStep ? '✓' : '▶'}</span>
                <span className={i <= sshStep ? 'text-green-neon' : 'text-green-neon/30'}>{step}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {phase === 'success' && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
            <div className="text-green-neon">✓ PAQUETE TRANSMITIDO EXITOSAMENTE</div>
            <div className="text-green-neon/60 text-sm">  Responderé a la brevedad. Gracias por conectarte.</div>
            <div className="pt-2">
              <button onClick={onClose} className="text-sm text-green-neon/50 hover:text-green-neon transition-colors cursor-pointer">
                [CERRAR]
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
            <div className="text-red-400">✗ ERROR: {errorMsg}</div>
            <div className="pt-2 flex gap-3">
              <button onClick={() => setPhase('form')} className="text-sm border border-red-400/50 px-3 py-1 text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
                [REINTENTAR]
              </button>
              <button onClick={onClose} className="text-sm text-green-neon/40 hover:text-green-neon/80 cursor-pointer">
                [CANCELAR]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-green-neon/50 text-xs mt-3">
        ╚════════════════════════════════════════════╝
      </div>
    </motion.div>
  );
}
