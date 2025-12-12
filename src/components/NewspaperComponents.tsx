import React from 'react';

/**
 * TornEdge - A decorative SVG divider that creates a "torn paper" effect
 * Place between sections to enhance the newspaper aesthetic
 */
export const TornEdge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full h-12 overflow-hidden leading-none rotate-180 ${className}`}>
    <svg
      className="block w-full h-full text-paper"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0V46.29c47,0,47,69,96,69H250c47,0,47-69,96-69H400c47,0,47,69,96,69H650c47,0,47-69,96-69H800c47,0,47,69,96,69H1050c47,0,47-69,96-69h150V0Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

/**
 * StampBadge - A circular rotated badge for "Halal", "Best Seller", etc.
 * Usage: <StampBadge text="HALAL" />
 */
interface StampBadgeProps {
  text: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
}

export const StampBadge: React.FC<StampBadgeProps> = ({
  text,
  color = 'rust',
  size = 'md',
  rotation = -15
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-24 h-24 text-sm',
    lg: 'w-32 h-32 text-base'
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-2 border-${color} text-${color} flex items-center justify-center font-accent font-bold tracking-wider uppercase opacity-90 mix-blend-multiply`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {text}
    </div>
  );
};

/**
 * NewspaperCard - A card component with newspaper clipping aesthetic
 * Can be used for menu items, testimonials, or article previews
 */
interface NewspaperCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'clipping' | 'polaroid';
}

export const NewspaperCard: React.FC<NewspaperCardProps> = ({
  children,
  className = '',
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-paper border border-ink/20 shadow-md',
    clipping: 'bg-paper border-b-2 border-ink/30 shadow-sm clip-path-polygon',
    polaroid: 'bg-paper p-4 shadow-lg border-8 border-paper'
  };

  return (
    <div className={`${variantClasses[variant]} transition-transform duration-300 hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};

/**
 * NewspaperHeadline - Pre-styled headline component
 */
interface NewspaperHeadlineProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export const NewspaperHeadline: React.FC<NewspaperHeadlineProps> = ({
  children,
  level = 2,
  className = ''
}) => {
  const baseClasses = 'font-headline font-bold text-ink leading-tight';
  const sizeClasses = {
    1: 'text-6xl md:text-8xl',
    2: 'text-4xl md:text-6xl',
    3: 'text-3xl md:text-4xl',
    4: 'text-2xl md:text-3xl'
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${baseClasses} ${sizeClasses[level]} ${className}`}>
      {children}
    </Tag>
  );
};

/**
 * DottedLeader - The dotted line that connects menu items to prices
 * Usage: <DottedLeader />
 */
export const DottedLeader: React.FC = () => (
  <span className="flex-1 border-b border-dotted border-ink/30 mx-2 mb-1"></span>
);

/**
 * Divider - A simple divider with newspaper aesthetic
 */
interface DividerProps {
  variant?: 'solid' | 'dashed' | 'accent';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  className = ''
}) => {
  const variantClasses = {
    solid: 'border-t border-ink/20',
    dashed: 'border-t border-dashed border-ink/30',
    accent: 'h-1 bg-rust w-24 mx-auto'
  };

  return <div className={`${variantClasses[variant]} ${className}`}></div>;
};

