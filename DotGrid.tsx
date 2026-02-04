import React from 'react';

interface DotGridProps {
  className?: string;
  opacity?: number;
}

export const DotGrid: React.FC<DotGridProps> = ({ 
  className = '', 
  opacity = 0.08 
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity,
      }}
    />
  );
};

export default DotGrid;
