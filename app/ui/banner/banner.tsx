import { darkenColor } from '@/app/lib/utils';

interface BannerProps {
    title: string;
    color?: string;
  }

export default function Banner({title, color = '#312e81'}: BannerProps) {
    return(<>
        <div className="lg:h-40 h-24" style={{
            background: `linear-gradient(284.38deg, ${darkenColor(color, 20)}, ${color})`
           }}>
            <div className="h-full flex items-center text-white text-[32px] lg:text-[48px]">
                <div className="ml-3 p-2 font-extrabold">
                    {title}
                </div>
            </div>
        </div>
    </>)
}