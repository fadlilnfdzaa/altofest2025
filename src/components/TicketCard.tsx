'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TicketCardProps {
  type: string;
  price: string;
  features: string[];
  popular?: boolean;
  gradient: 'warm' | 'cool' | 'full';
  link: string;
}

export default function TicketCard({ type, price, features, popular = false, gradient,link}: TicketCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  let gradientClass = '';
  switch(gradient) {
    case 'warm':
      gradientClass = 'bg-warm-gradient';
      break;
    case 'cool':
      gradientClass = 'bg-cool-gradient';
      break;
    case 'full':
      gradientClass = 'bg-festival-gradient';
      break;
    default:
      gradientClass = 'bg-warm-gradient';
  }

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'transform scale-105' : ''
      } ${popular ? 'border-2 border-[#ffc700]' : 'border border-foreground/10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <div className={`absolute top-0 right-0 ${gradientClass} text-white px-4 py-1 rounded-bl-lg font-bold text-sm`}>
          PENAWARAN TERBAIK
        </div>
      )}
      
      <div className="p-6 bg-background">
        <div className="mb-4">
          <h3 className={`text-2xl font-bold mb-2 text-${gradient}-gradient`}>{type}</h3>
          <div className="flex items-end">
            <span className="text-4xl font-bold">{price}</span>
            <span className="text-foreground/70 ml-1">/person</span>
          </div>
        </div>
        
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-[#ffc700] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link href={link} target="_blank">
          <button className={`w-full py-3 px-4 rounded-full text-white font-medium transition-all ${gradientClass} hover:shadow-lg`}>
            BELI TIKET
          </button>
        </Link>
      </div>
    </div>
  );
}
