import { BannerSkeleton } from "./banner";
import { CardSkeleton } from "./card";
// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function TeamPageSkeleton() {
    return (
      <>
        <div className={`team-page-wrapper`}>
          <BannerSkeleton />
          <div className="flex flex-wrap justify-center">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
          </div>
        </div>
      </>
    );
  }