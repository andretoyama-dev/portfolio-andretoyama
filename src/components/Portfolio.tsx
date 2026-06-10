import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  Database, 
  Cloud, 
  FileCode, 
  Palette, 
  Zap, 
  Atom, 
  Box, 
  Braces, 
  Container, 
  Layers, 
  Play, 
  GitBranch,
  Volume2,
} from 'lucide-react';

import AgeCounter from './AgeCounter';
import Equalizer from './Equalizer';
import CarnotaurusViewer from './CarnotaurusViewer';
import { translations } from '../translations';

import arcticMonkeysImg from '../assets/arctic-monkeys.webp';
import arcticMonkeysSfx from '../assets/arctic-monkeys-sample.mp3';

const BIRTH_DATE = new Date('2004-06-09T14:55:00');

const TECH_STACK = [
  { icon: <FileCode className="w-5 h-5" />, name: 'HTML5', color: 'text-orange-500' },
  { icon: <Palette className="w-5 h-5" />, name: 'CSS3', color: 'text-blue-400' },
  { icon: <Zap className="w-5 h-5" />, name: 'JavaScript', color: 'text-yellow-400' },
  { icon: <Cpu className="w-5 h-5" />, name: 'TypeScript', color: 'text-blue-500' },
  { icon: <Atom className="w-5 h-5" />, name: 'React', color: 'text-cyan-400' },
  { icon: <Box className="w-5 h-5" />, name: 'Bootstrap', color: 'text-purple-500' },
  { icon: <Terminal className="w-5 h-5" />, name: 'Node.js', color: 'text-green-500' },
  { icon: <Braces className="w-5 h-5" />, name: 'Python', color: 'text-blue-600' },
  { icon: <Database className="w-5 h-5" />, name: 'PostgreSQL', color: 'text-indigo-400' },
  { icon: <Container className="w-5 h-5" />, name: 'Docker', color: 'text-blue-500' },
  { icon: <Layers className="w-5 h-5" />, name: 'Kubernetes', color: 'text-blue-600' },
  { icon: <Cloud className="w-5 h-5" />, name: 'AWS', color: 'text-orange-400' },
  { icon: <Play className="w-5 h-5" />, name: 'GH Actions', color: 'text-blue-400' },
  { icon: <GitBranch className="w-5 h-5" />, name: 'Git', color: 'text-red-500' },
  { icon: <Terminal className="w-5 h-5" />, name: 'Shell/Bash', color: 'text-gray-400' },
];

export default function Portfolio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  const [lang, setLang] = useState<'en' | 'pt'>(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const locale = window.navigator.language || '';
      if (locale.toLowerCase().startsWith('pt')) {
        return 'pt';
      }
    }
    return 'en';
  });

  const t = translations[lang];

  const currentSrcRef = useRef<string | null>(null);

  useEffect(() => {
    // Preload audio immediately when component mounts
    audioRef.current = new Audio(arcticMonkeysSfx);
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';
    audioRef.current.load(); // Request browser to start loading/buffering early
    currentSrcRef.current = arcticMonkeysSfx;

    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = (src: string) => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
    setActiveAudio(src);
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      currentSrcRef.current = src;
    } else if (currentSrcRef.current !== src) {
      audioRef.current.pause();
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      currentSrcRef.current = src;
    }
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
  };

  const stopSound = () => {
    setActiveAudio(null);
    if (audioRef.current) {
      fadeRef.current = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          if (fadeRef.current) clearInterval(fadeRef.current);
          fadeRef.current = null;
          if (audioRef.current) audioRef.current.pause();
        }
      }, 50);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const isPlaying = activeAudio === arcticMonkeysSfx;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[1400px] mx-auto px-6 py-12 md:py-24 space-y-32 overflow-hidden md:overflow-visible"
    >
      {/* Floating Language Switcher */}
      <div className="flex justify-end font-mono text-[10px] tracking-widest z-50 relative -mb-20 md:-mb-16">
        <div className="flex items-center space-x-2 border border-white/10 bg-black/60 px-3 py-1.5 rounded-sm">
          <button 
            onClick={() => setLang('en')} 
            className={`transition-colors uppercase ${lang === 'en' ? 'text-brand-red font-bold' : 'text-gray-500 hover:text-white'}`}
          >
            EN
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => setLang('pt')} 
            className={`transition-colors uppercase ${lang === 'pt' ? 'text-brand-red font-bold' : 'text-gray-500 hover:text-white'}`}
          >
            PT
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto space-y-8 relative">
        {/* Music Floating Module */}
        <motion.div 
          variants={itemVariants}
          className="absolute -top-16 md:top-0 right-0 z-50 flex flex-col items-end space-y-3 group"
          onMouseEnter={() => playSound(arcticMonkeysSfx)}
          onMouseLeave={stopSound}
        >
          <div className="flex items-center space-x-3 text-brand-red opacity-50 group-hover:opacity-100 transition-opacity">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-right">{t.resonanceActive}</span>
            <Volume2 className="w-4 h-4" />
          </div>
          
          <div className="relative w-24 h-24 md:w-32 md:h-32 cursor-pointer">
            <div className="absolute inset-0 bg-black border border-white/10 group-hover:border-brand-red/40 transition-all rounded-full overflow-hidden shadow-2xl">
              <img src={arcticMonkeysImg} className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700" alt="Arctic Monkeys — AM album cover" />
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>
                 <Equalizer isPlaying={isPlaying} />
              </div>
              <div className={`absolute inset-0 border-2 border-brand-red/20 rounded-full ${isPlaying ? 'animate-ping' : ''}`}></div>
            </div>
            <div className={`absolute -inset-2 border border-dashed border-brand-red/30 rounded-full ${isPlaying ? 'animate-spin-slow' : 'opacity-0'} transition-opacity`}></div>
            
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-brand-red/0 group-hover:border-brand-red/40 transition-all duration-500"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-brand-red/0 group-hover:border-brand-red/40 transition-all duration-500"></div>
          </div>
          
          <div className="text-right pointer-events-none mt-2">
             <span className="font-mono text-[9px] text-white opacity-40 group-hover:opacity-100 uppercase tracking-widest block">Arctic Monkeys</span>
             <span className="font-mono text-[7px] text-brand-red/40 uppercase block">{t.recordVault}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2 group relative z-10">
          <div className="flex items-center space-x-2 text-brand-red/50 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
            <span className="w-8 h-[1px] bg-brand-red/30"></span>
            <span>{t.establishConnection}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase italic group-hover:animate-glitch">
            André Toyama
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-mono tracking-tighter">
            &gt; <span className="text-white">{t.devopsEngineer}</span> <span className="text-brand-red/40 animate-pulse">_</span> {t.fullstackDeveloper}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AgeCounter birthDate={BIRTH_DATE} lang={lang} />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
          <a href="mailto:andreluiz.toyama@gmail.com" className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10">
            <Mail className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">{t.emailMe}</span>
          </a>
          <a href="https://github.com/andretoyama-dev" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10">
            <Github className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">{t.github}</span>
          </a>
          <a href="https://linkedin.com/in/andré-luiz-toyama-zanello" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10">
            <Linkedin className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">{t.linkedin}</span>
          </a>
        </motion.div>
      </section>

      {/* Profile Section */}
      <section className="relative px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start relative w-full">
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-brand-red/20 via-brand-red/10 to-transparent hidden md:block"></div>
            <motion.div variants={itemVariants} className="space-y-6 md:pl-12">
              <div className="flex items-center space-x-2 text-brand-red mb-2">
                <Terminal className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em]">{t.systemProfile}</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight italic glow-text">
                "{t.quote}"
              </h2>
              <p className="font-mono text-xs text-brand-red/60 bg-brand-red/5 inline-block px-2 py-1 rounded-sm border border-brand-red/10">
                {t.location}
              </p>
              <div className="space-y-4 text-gray-400 leading-relaxed font-mono text-sm border-l border-brand-red/10 pl-6 py-2">
                <p>
                  {t.devopsEngineer} @ <a href="https://www.siltechconsult.com.br/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red border-b border-white/20 hover:border-brand-red/50 transition-all">Siltech Consult</a>. 
                  {t.paragraph1.replace(t.devopsEngineer + " @ Siltech Consult. ", "")}
                </p>
                <p>
                  {t.paragraph2.split(":")[0]}: <span className="text-white">{t.paragraph2.split(":")[1]?.trim()}</span>
                </p>
                <p>
                  {t.paragraph3.split(":")[0]}: <a href="https://github.com/andretoyama-dev/FinHelper" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red border-b border-white/20 hover:border-brand-red/50 transition-all">FinHelper</a> {t.paragraph3.substring(t.paragraph3.indexOf("//"))}
                </p>
                <p>
                  {t.paragraph4}
                </p>
                <p className="text-xs text-gray-500 opacity-60">
                  {t.paragraph5}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="cyber-border bg-black/60 p-8 rounded-sm space-y-6 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-red/20"></div>
               <div className="space-y-4 relative z-10">
                  <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase">{t.memoryDump}</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TECH_STACK.map((tech) => (
                      <div key={tech.name} className="flex flex-col items-center justify-center space-y-2 p-3 bg-white/[0.02] border border-white/5 hover:border-brand-red/30 hover:bg-brand-red/5 transition-all cursor-default">
                        <span className={`${tech.color} drop-shadow-[0_0_8px_currentColor]`}>{tech.icon}</span>
                        <span className="text-[9px] text-gray-300 font-mono uppercase tracking-wider text-center">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-brand-red/10 space-y-2">
                     <p className="text-[10px] font-mono text-gray-500 tracking-tighter uppercase opacity-50">{t.cloudInfra}</p>
                     <p className="text-[10px] font-mono text-brand-red/80 break-all">ECS // LAMBDA // S3 // AURORA_RDS // IAM // VPC</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carnotaurus Section */}
      <section className="space-y-12 px-4 md:px-0 relative">
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4 w-full">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-red/50 to-brand-red/20"></div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-sm text-brand-red tracking-[0.5em] uppercase whitespace-nowrap opacity-80 mb-1">{t.favoriteDino}</span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest italic animate-pulse">{t.dinoEra}</span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brand-red/50 to-brand-red/20"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                  Carnotaurus <span className="text-brand-red">Sastrei</span>
                </h3>
                <p className="font-mono text-gray-400 text-sm leading-relaxed">
                  {t.dinoDescription}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                  <span className="block text-[8px] font-mono text-brand-red uppercase mb-1">{t.maxVelocity}</span>
                  <span className="text-xl font-bold text-white tracking-widest">50 KM/H</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                  <span className="block text-[8px] font-mono text-brand-red uppercase mb-1">{t.armorType}</span>
                  <span className="text-xl font-bold text-white tracking-widest">{t.armorValue}</span>
                </div>
              </div>
              
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest opacity-60">
                {t.dataIntegrity}
              </p>
            </div>
            
            <div className="order-1 md:order-2">
              <CarnotaurusViewer lang={lang} />
            </div>
          </div>
        </motion.div>
      </section>

    </motion.div>
  );
}
