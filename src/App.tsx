import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Portfolio from './components/Portfolio';
import TerminalLoader from './components/TerminalLoader';

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <main className="relative min-h-screen selection:bg-brand-red/30 selection:text-brand-red overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-maroon/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 scanlines opacity-50" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      </div>

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <TerminalLoader key="loader" onComplete={() => setIsBooted(true)} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <Portfolio />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
