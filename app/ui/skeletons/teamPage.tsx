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


export function TeamDetailPageSkeleton() {
  return (
    <>
      <div className={`team-page-wrapper`}>
        <BannerSkeleton isTeamDetail={true} />
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </>
  );
}