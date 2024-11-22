import { BannerSkeleton } from './banner';
// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CoachPageSkeleton() {
    return (
      <>
        <div className={`player-page-wrapper`}>
          <BannerSkeleton />
          <div className="mt-4">
            <div className={`${shimmer} w-full h-[45px] bg-gray-300`}></div>
            <div className={`${shimmer} w-full h-[calc(100vh-240px)] lg:h-[calc(100vh-291px)] bg-gray-200`}></div>
          </div>
        </div>
      </>
    );
  }