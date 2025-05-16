'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SponsorCardProps {
  name: string;
  logo: string;
  level: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  description: string;
  website: string;
}

export default function SponsorCard({ name, logo, level, description, website }: SponsorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getLevelStyle = () => {
    switch (level) {
      case 'platinum':
        return {
          bgColor: 'bg-festival-gradient',
          textColor: 'text-white',
          borderColor: 'border-[#ffc700]',
          hoverScale: 'group-hover:scale-105'
        };
      case 'gold':
        return {
          bgColor: 'bg-warm-gradient',
          textColor: 'text-white',
          borderColor: 'border-[#ffc700]',
          hoverScale: 'group-hover:scale-105'
        };
      case 'silver':
        return {
          bgColor: 'bg-cool-gradient',
          textColor: 'text-white',
          borderColor: 'border-[#7de6e9]',
          hoverScale: 'group-hover:scale-105'
        };
      case 'bronze':
        return {
          bgColor: 'bg-[#7a3c20]',
          textColor: 'text-white',
          borderColor: 'border-[#7a3c20]',
          hoverScale: 'group-hover:scale-105'
        };
      default:
        return {
          bgColor: 'bg-background',
          textColor: 'text-foreground',
          borderColor: 'border-foreground/10',
          hoverScale: 'group-hover:scale-105'
        };
    }
  };
  
  const styles = getLevelStyle();

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl border ${styles.borderColor} transition-all duration-300 ${
        isHovered ? 'transform scale-105 shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-0 right-0 ${styles.bgColor} ${styles.textColor} px-3 py-1 text-xs font-bold uppercase rounded-bl-lg`}>
        {level}
      </div>
      
      <div className="p-6 bg-background">
        <div className="h-20 relative mb-4 flex items-center justify-center">
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-contain transition-transform duration-300 ${styles.hoverScale}`}
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-center">{name}</h3>
        
        <p className="text-foreground/70 text-sm mb-4 text-center">
          {description}
        </p>
        
        <div className="text-center">
          <a 
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${styles.bgColor} ${styles.textColor} px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md`}
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}
