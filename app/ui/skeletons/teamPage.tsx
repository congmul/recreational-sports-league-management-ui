import { CardSkeleton } from "./card";

export function TeamPageSkeleton() {
    return (
      <>
        <div className="m-5 font-bold">

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