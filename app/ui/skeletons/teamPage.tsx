import { BannerSkeleton } from "./banner";
import { CardSkeleton } from "./card";

export function TeamPageSkeleton() {
    return (
      <>
        <div className={`team-page-wrapper relative`}>
            <BannerSkeleton />
          <div className="flex flex-wrap justify-center">
            <TeamCardsSkeleton />
          </div>
        </div>
      </>
    );
  }


export function TeamDetailPageSkeleton() {
  return (
    <>
      <div className={`team-page-wrapper relative`}>
        <BannerSkeleton isTeamDetail={true} />
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </>
  );
}


export function TeamCardsSkeleton() {
  return (
    <>
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
    </>
  );
}