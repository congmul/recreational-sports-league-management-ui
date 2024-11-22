import { darkenColor } from '@/app/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';

interface BannerProps {
    title: string;
    color?: string;
    isTeamDetail?: boolean
    logoUrl?: string
    tla?: string
    est?: string
    stadium?: string
    baseCity?: string
  }

export default function Banner({title, color = '#312e81', isTeamDetail, tla, est, stadium, baseCity, logoUrl}: BannerProps) {
    return(<>
        <div className={clsx("lg:h-40 h-24", {"lg:h-96 h-52" : isTeamDetail})} 
            style={{
                background: `linear-gradient(284.38deg, ${darkenColor(color, 20)}, ${color})`
           }}>
            <div className="h-full flex items-center text-white text-[32px] lg:text-[48px]">
                {
                    isTeamDetail
                    ? <>
                        {logoUrl && <Image className="w-[96px] lg:w-[128px]" src={logoUrl} alt={tla || ''} width={128} height={128} />}
                        <div className="ml-3 p-2">
                            <div className="lg:text-[64px] font-black">{title}</div>                            
                            <div className="flex items-center text-base">
                                <div>Est: {est?.split('-')[0]}</div>
                                <div className="mx-4 h-1 w-1 rounded-full bg-white"></div>
                                <div>{stadium}, {baseCity}</div>
                            </div>
                        </div>
                    </>
                    :
                        <div className="ml-3 p-2 font-extrabold">
                            {title}
                        </div>
                }
            </div>
        </div>
    </>)
}