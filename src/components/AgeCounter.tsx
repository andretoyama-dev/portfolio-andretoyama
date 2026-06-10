import { useEffect, useState, useRef } from 'react';

interface AgeCounterProps {
  birthDate: Date;
  lang: 'en' | 'pt';
}

export default function AgeCounter({ birthDate, lang }: AgeCounterProps) {
  const [age, setAge] = useState<string>('0.0000000000000000');
  const [timeLeft, setTimeLeft] = useState<string>('0.0000000000000000');
  const requestRef = useRef<number>(0);

  const MS_PER_YEAR = 31556952000;
  const LIFE_EXPECTANCY = 81;

  const animate = () => {
    const now = new Date();
    const diffMs = now.getTime() - birthDate.getTime();
    const ageValue = diffMs / MS_PER_YEAR;
    
    setAge(ageValue.toFixed(15));
    setTimeLeft((LIFE_EXPECTANCY - ageValue).toFixed(15));
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const labelAge = lang === 'en' ? 'Age.Current:' : 'Idade.Atual:';
  const labelTime = lang === 'en' ? 'Est. Time_Remaining:' : 'Tempo.Restante_Est:';
  const unit = lang === 'en' ? 'yr' : 'anos';

  return (
    <div className="flex flex-col space-y-1 font-mono text-[10px] md:text-sm tracking-tight border-l-2 border-brand-red/30 pl-4 py-1">
      <div className="flex items-baseline space-x-2">
        <span className="text-gray-600 uppercase tracking-widest font-bold">{labelAge}</span>
        <span className="text-brand-red md:text-xl font-medium tabular-nums glow-text">{age}</span>
        <span className="text-gray-600 uppercase">{unit}</span>
      </div>
      <div className="flex items-baseline space-x-2 opacity-50">
        <span className="text-gray-700 italic tracking-tighter">{labelTime}</span>
        <span className="text-gray-500 tabular-nums">{timeLeft}</span>
        <span className="text-gray-700 italic">{unit}</span>
      </div>
    </div>
  );
}
