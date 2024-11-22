import { BannerSkeleton } from "./banner";
import { CardSkeleton } from "./card";

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