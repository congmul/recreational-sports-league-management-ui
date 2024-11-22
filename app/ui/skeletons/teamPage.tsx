import { CardSkeleton } from "./card";
// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function TeamPageSkeleton() {
    return (
      <>
        <div className={`team-page-wrapper`}>
          <div className={`h-32`}>
            <div className={`${shimmer} h-full flex items-center text-white bg-gray-200`}>
                <div className="ml-3 p-2">
                  <div className="ml-2 h-12 w-36 rounded-md bg-gray-300 text-sm font-medium" />
                </div>
            </div>
          </div>
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