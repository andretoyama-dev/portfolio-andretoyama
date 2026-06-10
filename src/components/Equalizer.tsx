import { motion } from 'motion/react';

interface EqualizerProps {
  isPlaying: boolean;
}

export default function Equalizer({ isPlaying }: EqualizerProps) {
  return (
    <div className="flex items-end space-x-0.5 h-4">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-brand-red"
          animate={{
            height: isPlaying ? ['20%', '100%', '40%', '80%', '20%'] : '20%'
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
