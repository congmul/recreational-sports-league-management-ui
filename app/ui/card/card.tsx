import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import './card.scss';

interface CardProps {
  logo: string; // URL of the team's logo
  name: string; // Team's name
  tla: string;
  color?: string; // Optional background color or accent
}

const Card: React.FC<CardProps> = ({ logo, name, tla = 'ARS', color }) => {
  const teamColorMap:any = {
    ARS: "#EF0107",
    AVL: "#95bfe5",
    CHE: "#034694",
    EVE: "#003399",
    FUL: "#000000",
    LIV: "#c8102E",
    MCI: "#6CABDD",
    MUN: "#DA291C",
    NEW: "#241F20",
    TOT: "#132257",
    WOL: "#FDB913",
  }
  function darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) - Math.round((num >> 16) * percent / 100);
    let g = ((num >> 8) & 0x00FF) - Math.round(((num >> 8) & 0x00FF) * percent / 100);
    let b = (num & 0x0000FF) - Math.round((num & 0x0000FF) * percent / 100);
  
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);
  
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }
  return (
    <div
      className={`card-wrapper relative w-64 h-40 flex flex-col justify-between p-4 border rounded-lg shadow-md transition-shadow duration-300 cursor-pointer
        hover:text-white
        `}
      style={{ '--card-background': teamColorMap[tla] || '#f9f9f9', '--card-after-bg-bttom': `linear-gradient(284.38deg, ${darkenColor(teamColorMap[tla], 30)}, ${teamColorMap[tla]})` } as React.CSSProperties}
    >
      <img src={logo} alt={`${name} logo`} className="w-20 h-20 object-contain" />
      <div className="w-100 flex items-end justify-between mt-2">
        <div className="text-lg font-bold mt-2">{name}</div>
        <ArrowLongRightIcon width={'24'} />
      </div>
    </div>
  );
};

export default Card;