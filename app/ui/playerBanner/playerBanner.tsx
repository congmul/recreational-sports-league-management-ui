import { darkenColor } from '@/app/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';

interface PlayerBannerProps {
    firstName: string,
    lastName: string,
    shirtNumber?: number,
    color: string,
    profileUrl: string | undefined
    isCoach?: boolean
}

export default function PlayerBanner({firstName, lastName, shirtNumber, color, profileUrl, isCoach}: PlayerBannerProps) {
    return(<>
        <div className={clsx("h-[230px]")} 
            style={{
                background: `linear-gradient(284.38deg, ${darkenColor(color, 20)}, ${color})`
           }}>
            <div className="h-full flex items-center text-white text-[32px] lg:text-[48px] relative">            
                {/* Profile Section */}
                <div className="absolute top-[38px] left-20">
                    <Image
                        src={profileUrl || '/assets/img/Photo-Missing-250.png'}
                        alt={`${firstName} ${lastName}`}            
                        width={147}
                        height={160}
                        className="rounded-t-lg w-full h-auto"
                    />
                </div>
                <div className="absolute top-[0px] left-[325px] relative">
                    <div className="text-[18px] lg:text-[32px]">{lastName}</div>
                    <div className="text-[42px] lg:text-[64px] font-extrabold">{firstName}</div>
                </div>
                {
                    !isCoach &&
                    <div className="p-3 absolute lg:top-[-25px] top-[160px] lg:right-[70px] text-[42px] lg:text-[170px] font-extrabold">
                        {shirtNumber}
                    </div>
                }
            </div>
        </div>
    </>)
}