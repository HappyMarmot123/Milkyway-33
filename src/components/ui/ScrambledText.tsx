// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM
// Simplified version without premium GSAP plugins

import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';
import './ScrambledText.css';

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const ScrambledText = ({
  radius = 100,
  duration = 800,
  speed = 50,
  scrambleChars = ':.',
  className = '',
  style = {},
  children
}: ScrambledTextProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState<{ char: string; original: string; isScrambling: boolean }[]>([]);
  const scrambleTimeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Split text into characters on mount
  useEffect(() => {
    const text = typeof children === 'string' ? children : '';
    const charArray = text.split('').map((char) => ({
      char,
      original: char,
      isScrambling: false
    }));
    setChars(charArray);
  }, [children]);

  const scrambleChar = (index: number) => {
    // Clear existing timeout for this index
    const existingTimeout = scrambleTimeouts.current.get(index);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const original = chars[index]?.original;
    if (!original || original === ' ') return;

    let iterations = 0;
    const maxIterations = Math.ceil(duration / speed);

    const animate = () => {
      if (iterations >= maxIterations) {
        // Restore original character
        setChars(prev => {
          const newChars = [...prev];
          if (newChars[index]) {
            newChars[index] = { ...newChars[index], char: original, isScrambling: false };
          }
          return newChars;
        });
        scrambleTimeouts.current.delete(index);
        return;
      }

      // Set random scramble character
      const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      setChars(prev => {
        const newChars = [...prev];
        if (newChars[index]) {
          newChars[index] = { ...newChars[index], char: randomChar, isScrambling: true };
        }
        return newChars;
      });

      iterations++;
      const timeout = setTimeout(animate, speed);
      scrambleTimeouts.current.set(index, timeout);
    };

    animate();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!rootRef.current) return;

    const charElements = rootRef.current.querySelectorAll('.scramble-char');
    charElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < radius && !chars[index]?.isScrambling) {
        scrambleChar(index);
      }
    });
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      scrambleTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <div 
      ref={rootRef} 
      className={`scrambled-text-block ${className}`} 
      style={style}
      onPointerMove={handlePointerMove}
    >
      <p>
        {chars.map((item, index) => (
          <span 
            key={index} 
            className={`scramble-char ${item.isScrambling ? 'scrambling' : ''}`}
          >
            {item.char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ScrambledText;
