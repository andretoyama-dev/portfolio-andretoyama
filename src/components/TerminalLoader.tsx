import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TerminalLoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: "> INITIALIZING SECURITY CONNECTION PROTOCOLS...", delay: 200 },
  { text: "> INJECTING LAYER: CORE_SYS.ATMOSPHERE... [SUCCESS]", delay: 800 },
  { text: "> PARSING LAYER: TECH_STACK.CONF... [SUCCESS]", delay: 1400 },
  { text: "> RECONSTRUCTING GENOME: CARNOTAPE_DNA... [SUCCESS]", delay: 2000 },
  { text: "> ESTABLISHING DEVOPS NEURAL LINK... [ACCESS GRANTED]", delay: 2600 },
  { text: "> LAUNCHING NEURAL DASHBOARD...", delay: 3200 },
];

export default function TerminalLoader({ onComplete }: TerminalLoaderProps) {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);

    // Boot logs display sequence
    const timers = BOOT_LOGS.map((log) => {
      return setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    // Complete loader screen
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 3900);

    return () => {
      clearInterval(cursorInterval);
      timers.forEach((t) => clearTimeout(t));
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-center px-8 md:px-24 font-mono text-xs md:text-sm text-brand-red selection:bg-brand-red/30">
      {/* Background scanlines & noise */}
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* Terminal Container */}
      <div className="max-w-3xl space-y-3 relative z-10">
        <div className="flex items-center space-x-2 text-[10px] text-brand-red/40 tracking-[0.2em] uppercase mb-6 border-b border-brand-red/10 pb-2">
          <span>Neural_OS // Boot_Sequence v1.0.0</span>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {visibleLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={index === BOOT_LOGS.length - 1 ? "text-white glow-text" : ""}
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex items-center space-x-1 pt-2">
            <span>&gt;</span>
            <span
              className={`w-2 h-4 bg-brand-red transition-opacity duration-100 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
