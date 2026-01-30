import { useRef, useEffect, ReactNode } from 'react';
import './LogoLoop.css';

interface LogoLoopProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export function LogoLoop({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}: LogoLoopProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerInnerRef.current) return;

    const scrollerContent = Array.from(scrollerInnerRef.current.children);
    
    // Duplicate items for infinite loop effect
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      scrollerInnerRef.current?.appendChild(duplicatedItem);
    });
  }, []);

  return (
    <div
      ref={scrollerRef}
      className={`logo-loop ${pauseOnHover ? 'logo-loop--pause-on-hover' : ''} ${className}`}
      style={{
        '--speed': `${speed}s`,
        '--direction': direction === 'left' ? 'forwards' : 'reverse'
      } as React.CSSProperties}
    >
      <div ref={scrollerInnerRef} className="logo-loop__inner">
        {children}
      </div>
    </div>
  );
}

interface LogoLoopItemProps {
  children: ReactNode;
  className?: string;
}

export function LogoLoopItem({ children, className = '' }: LogoLoopItemProps) {
  return (
    <div className={`logo-loop__item ${className}`}>
      {children}
    </div>
  );
}
