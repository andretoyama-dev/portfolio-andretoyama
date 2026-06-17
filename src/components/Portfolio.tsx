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
  Pause,
  Volume2,
  GitBranch,
} from 'lucide-react';

import AgeCounter from './AgeCounter';
import Equalizer from './Equalizer';
import CarnotaurusViewer from './CarnotaurusViewer';

import arcticMonkeysImg from '../assets/arctic-monkeys.webp';
import arcticMonkeysSfx from '../assets/arctic-monkeys-sample.mp3';
import profileImg from '../assets/profile.png';

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
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Preload audio immediately when component mounts to minimize latency
    audioRef.current = new Audio(arcticMonkeysSfx);
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';
    audioRef.current.load();

    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }

    if (isPlaying) {
      // Fade out
      setIsPlaying(false);
      fadeRef.current = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          if (fadeRef.current) clearInterval(fadeRef.current);
          fadeRef.current = null;
          if (audioRef.current) audioRef.current.pause();
        }
      }, 50);
    } else {
      // Fade in
      audioRef.current.volume = 0.05;
      setIsPlaying(true);
      audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
      fadeRef.current = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.4) {
          audioRef.current.volume += 0.05;
        } else {
          if (fadeRef.current) clearInterval(fadeRef.current);
          fadeRef.current = null;
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-24 overflow-hidden md:overflow-visible"
    >
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto space-y-8 relative">
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 w-full">
          <motion.div variants={itemVariants} className="space-y-2 group relative z-10 flex-1">
            <div className="flex items-center space-x-2 text-brand-red/50 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
              <span className="w-8 h-[1px] bg-brand-red/30"></span>
              <span>Establish Connection // Authorized Access</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase italic group-hover:animate-glitch">
              André Toyama
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-mono tracking-tighter">
              &gt; <span className="text-white">DevOps Engineer</span> <span className="text-brand-red/40 animate-pulse">_</span> Full-Stack Developer
            </p>
          </motion.div>

          {/* Cybernetic Profile Photo */}
          <motion.div 
            variants={itemVariants}
            className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 mx-auto md:mx-0"
          >
            <div className="absolute inset-0 border border-brand-red/30 rounded-sm overflow-hidden bg-black/40 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
              <img src={profileImg} className="w-full h-full object-cover grayscale opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-300" alt="André Toyama" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none opacity-30" />
            </div>
            {/* Cyber Corner Decos */}
            <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-brand-red/60" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-brand-red/60" />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <AgeCounter birthDate={BIRTH_DATE} />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
          <a href="mailto:andreluiz.toyama@gmail.com" className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10">
            <Mail className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">Email Me</span>
          </a>
          <a href="https://github.com/andretoyama-dev" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10">
            <Github className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/andré-luiz-toyama-zanello" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/10">
            <Linkedin className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </motion.div>
      </section>

      {/* Profile Section */}
      <section className="relative px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-stretch relative w-full">
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-brand-red/20 via-brand-red/10 to-transparent hidden md:block"></div>
            <motion.div variants={itemVariants} className="space-y-6 md:pl-12">
              <div className="flex items-center space-x-2 text-brand-red mb-2">
                <Terminal className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em]">System.Profile</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight italic glow-text">
                "Technology is supposed to make our lives better, but does it?"
              </h2>
              <p className="font-mono text-xs text-brand-red/60 bg-brand-red/5 inline-block px-2 py-1 rounded-sm border border-brand-red/10">
                LOC_TYPE: Ribeirão Preto, SP // BRASIL
              </p>
              <div className="space-y-4 text-gray-400 leading-relaxed font-mono text-sm border-l border-brand-red/10 pl-6 py-2">
                <p>
                  DevOps Engineer @ <a href="https://www.siltechconsult.com.br/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red border-b border-white/20 hover:border-brand-red/50 transition-all">Siltech Consult</a>. Driven by the craft of building scalable applications and intelligent automations.
                </p>
                <p>
                  Current Directive: <span className="text-white">Finalizing degree in Systems Analysis & Development [FATEC].</span>
                </p>
                <p>
                  Developing: <a href="https://github.com/andretoyama-dev/FinHelper" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red border-b border-white/20 hover:border-brand-red/50 transition-all">FinHelper</a> // A web & mobile ecosystem designed to organize finances, debts, and investments with advanced visual progress tracking and goal projection.
                </p>
                <p>
                  Protocol: Constant Learning // Lifelong Student.
                </p>
                <p className="text-xs text-gray-500 opacity-60">
                  Other_Interests: [Bodybuilding, Books, UFC, Nu-Metal]
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="cyber-border bg-black/60 p-8 rounded-sm space-y-6 overflow-hidden relative h-full flex flex-col justify-between">
               <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-red/20"></div>
               <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase">// Memory_Dump: Tech_Stack.conf</span>
                  <div className="grid grid-cols-3 gap-3.5 flex-1 items-center py-1">
                    {TECH_STACK.map((tech) => (
                      <div key={tech.name} className="flex flex-col items-center justify-center space-y-3 p-4 bg-white/[0.02] border border-white/5 hover:border-brand-red/40 hover:bg-brand-red/5 transition-all cursor-default h-[86px] rounded-sm">
                        <span className={`${tech.color} drop-shadow-[0_0_10px_currentColor] scale-125`}>{tech.icon}</span>
                        <span className="text-[10px] text-gray-300 font-mono uppercase tracking-wider text-center">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-brand-red/10 space-y-2.5">
                     <p className="text-[10px] font-mono text-gray-400 tracking-tighter uppercase opacity-75">Cloud Infrastructure Layers:</p>
                     <p className="text-[11px] font-mono text-brand-red/90 break-all font-semibold tracking-wider">ECS // LAMBDA // S3 // AURORA_RDS // IAM // VPC</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="relative px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center space-x-2 text-brand-red mb-2">
            <Terminal className="w-4 h-4 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em]">// Decrypted_Dossier: Projects.conf</span>
          </div>

          <motion.div 
            variants={itemVariants} 
            className="cyber-border bg-black/60 p-8 rounded-sm overflow-hidden relative w-full"
          >
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-red/20"></div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-2xl font-bold text-white tracking-tight italic">
                  <a href="https://github.com/andretoyama-dev/FinHelper" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red border-b border-transparent hover:border-brand-red/30 transition-all">
                    FinHelper
                  </a>
                </h3>
                <span className="font-mono text-[9px] text-brand-red bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 animate-pulse uppercase">
                  [STATUS: IN_DEVELOPMENT]
                </span>
              </div>
              <p className="font-mono text-xs text-brand-red/60 uppercase">
                Developing Now
              </p>
              <p className="font-mono text-gray-400 text-sm leading-relaxed border-l border-brand-red/10 pl-4 py-1">
                A modern web & mobile ecosystem designed to organize personal finances, track debts, and project long-term investment goals with advanced dynamic visualization.
              </p>
              <div className="pt-2">
                <span className="font-mono text-[9px] text-gray-500 tracking-wider uppercase block">System_Target:</span>
                <span className="font-mono text-[10px] text-white">React 18 // Vite // Recharts // JavaScript // CSS Variables</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carnotaurus Section */}
      <section className="space-y-12 px-4 md:px-0 relative">
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4 w-full">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-red/50 to-brand-red/20"></div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-sm text-brand-red tracking-[0.5em] uppercase whitespace-nowrap opacity-80 mb-1">Favorite_Dinosaur</span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest italic animate-pulse">Late Cretaceous // South America</span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brand-red/50 to-brand-red/20"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            <div className="order-2 md:order-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                  Carnotaurus <span className="text-brand-red">Sastrei</span>
                </h3>
                <p className="font-mono text-gray-400 text-sm leading-relaxed">
                  The 'meat-eating bull' represents the pinnacle of evolutionary specialization in the Late Cretaceous. With its characteristic horns and vestigial arms, it was a master of speed and precision.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                  <span className="block text-[8px] font-mono text-brand-red uppercase mb-1">Max_Velocity</span>
                  <span className="text-xl font-bold text-white tracking-widest">50 KM/H</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                  <span className="block text-[8px] font-mono text-brand-red uppercase mb-1">Armor_Type</span>
                  <span className="text-xl font-bold text-white tracking-widest">OSTEODERMS</span>
                </div>
              </div>
              
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest opacity-60">
                // DATA_INTEGRITY: Authentically modeled from Abelisaurid fossils.
              </p>
            </div>
            
            <div className="order-1 md:order-2">
              <CarnotaurusViewer />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fixed Cyberdeck Audio Console */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <motion.div 
          variants={itemVariants}
          className="w-[280px] font-mono text-[10px] bg-black/95 backdrop-blur-md border border-brand-red/30 p-3 rounded-sm space-y-2.5 shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:border-brand-red/60 transition-all select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-brand-red/10 pb-1 text-[8px] text-gray-500 uppercase tracking-widest">
            <span>System_Audio // Dev_Resonance</span>
            <span className={isPlaying ? "text-brand-red animate-pulse" : "text-gray-600"}>
              {isPlaying ? "● ACTIVE" : "○ MUTED"}
            </span>
          </div>

          {/* Main Section */}
          <div className="flex items-center space-x-3">
            {/* Album Art Button */}
            <button 
              onClick={togglePlay}
              className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center border border-brand-red/30 hover:border-brand-red/60 rounded-sm overflow-hidden group/btn focus:outline-none cursor-pointer"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {/* Album Cover */}
              <img src={arcticMonkeysImg} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'grayscale-0 opacity-90' : 'grayscale opacity-50'} group-hover/btn:opacity-100 group-hover/btn:grayscale-0`} alt="AM — Arctic Monkeys" />

              {/* Dark overlay for icon visibility */}
              <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-40' : 'opacity-60'} group-hover/btn:opacity-30`} />

              {/* Dashed spinner ring */}
              <div className={`absolute inset-0.5 rounded-sm border border-dashed border-brand-red/40 ${isPlaying ? 'animate-spin-slow' : 'opacity-0'} transition-opacity`} />

              {/* Control Icon */}
              <div className="relative z-10 text-brand-red">
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-brand-red text-brand-red filter drop-shadow-[0_0_6px_rgba(220,38,38,0.9)]" />
                ) : (
                  <Play className="w-4 h-4 fill-brand-red text-brand-red filter drop-shadow-[0_0_6px_rgba(220,38,38,0.9)] translate-x-0.5" />
                )}
              </div>
            </button>

            {/* Details Panel */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white font-bold tracking-wider truncate uppercase block">
                  Arctic Monkeys
                </span>
              </div>
              <div className="text-[8px] text-gray-500 font-mono truncate uppercase block">
                Source: AM // RECORD_VAULT
              </div>

              {/* Visualizer & Bitrate */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-end space-x-0.5 h-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-brand-red rounded-sm"
                      style={{
                        height: isPlaying ? '100%' : '20%',
                        animation: isPlaying ? `bar-pulse 0.6s ease-in-out infinite` : 'none',
                        animationDelay: `${i * 0.15}s`,
                        boxShadow: isPlaying ? '0 0 4px rgba(220,38,38,0.6)' : 'none'
                      }}
                    />
                  ))}
                </div>
                <span className="text-[7px] text-brand-red/50 uppercase tracking-widest font-mono">
                  320 KBPS // 44.1KHZ
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
