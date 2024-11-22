import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import './card.scss';
import { darkenColor } from '@/app/lib/utils';

interface CardProps {
  logo: string; // URL of the team's logo
  name: string; // Team's name
  tla: string;
}

const Card: React.FC<CardProps> = ({ logo, name, tla = 'ARS' }) => {
  const teamColorMap:Record<string, string> = {
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
  
  return (
    <div
      className={`card-wrapper relative w-64 h-40 flex flex-col justify-between p-4 border rounded-lg shadow-md transition-shadow duration-300 cursor-pointer
        m-3 hover:text-white
        `}
      style={{ '--card-background': teamColorMap[tla] || '#f9f9f9', '--card-after-bg-bttom': `linear-gradient(284.38deg, ${darkenColor(teamColorMap[tla], 30)}, ${teamColorMap[tla]})` } as React.CSSProperties}
    >
      <img src={logo} alt={`${name} logo`} className="w-16 h-16 object-contain" />
      <div className="w-100 flex items-end justify-between mt-2">
        <div className="text-lg font-bold mt-2">{name}</div>
        <ArrowLongRightIcon width={'24'} />
      </div>
    </div>
  );
};

export default Card;