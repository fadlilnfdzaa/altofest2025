'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ArtistCardProps {
  name: string;
  genre: string;
  country: string;
  image: string;
  day: string;
  time: string;
  stage: string;
  featured?: boolean;
}

export default function ArtistCard({ 
  name, 
  genre, 
  country, 
  image, 
  day, 
  time, 
  stage, 
  featured = false 
}: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
        isHovered ? 'transform scale-105' : ''
      } ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square w-full relative overflow-hidden">
        <Image
          src={image}
          alt={`${name} - ${genre} artist from ${country}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
        
        {featured && (
          <div className="absolute top-4 right-4 bg-festival-gradient text-white px-3 py-1 rounded-full text-sm font-bold">
            Featured Artist
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-1">{name}</h3>
          <p className="text-sm md:text-base opacity-90 mb-2">{genre} • {country}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-[#7a3c20]/80 px-2 py-1 rounded text-xs">
              {day}
            </span>
            <span className="bg-[#ffc700]/80 px-2 py-1 rounded text-xs text-black">
              {time}
            </span>
            <span className="bg-[#237ea5]/80 px-2 py-1 rounded text-xs">
              {stage} Stage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
