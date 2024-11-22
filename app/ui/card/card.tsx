import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import './card.scss';
import { darkenColor } from '@/app/lib/utils';
import { teamColorMap } from '@/app/lib/const-data';
import Image from 'next/image';

interface CardProps {
  logo: string; // URL of the team's logo
  name: string; // Team's name
  tla: string;
}

const Card: React.FC<CardProps> = ({ logo, name, tla = 'ARS' }) => {
  return (
    <div
      className={`group card-wrapper relative w-64 h-40 flex flex-col justify-between p-4 border rounded-lg shadow-md transition-shadow duration-300 cursor-pointer
        m-3 hover:text-white
        `}
      style={{ '--card-background': teamColorMap[tla] || '#f9f9f9', '--card-after-bg-bttom': `linear-gradient(284.38deg, ${darkenColor(teamColorMap[tla], 30)}, ${teamColorMap[tla]})` } as React.CSSProperties}
    >
      {
        tla === 'LIV' 
        ? <Image className="block group-hover:hidden" src={`/assets/img/team-logo/${tla}_filled.png`} alt={tla || ''} width={72} height={72} /> 
        : <Image src={`/assets/img/team-logo/${tla}.png`} alt={tla || ''} width={72} height={72} />       
      }
      {
        tla === 'LIV' &&
        <Image className="hidden group-hover:block" src={`/assets/img/team-logo/${tla === 'LIV' ? `${tla}` : tla}.png`} alt={tla || ''} width={72} height={72} /> 
      }
      <div className="w-100 flex items-end justify-between">
        <div className="text-lg font-bold mt-2">{name}</div>
        <ArrowLongRightIcon width={'24'} />
      </div>
    </div>
  );
};

export default Card;