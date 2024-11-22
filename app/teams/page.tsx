import Banner from '@/app/ui/banner/banner';
import { TeamCardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import TeamCards from '@/app/ui/team/teamCards';

export default async function Page() {
  return (<>
    <div className="team-page-wrapper">
      <Banner title={'Teams'} />
      <div className="flex flex-wrap justify-center relative">
        <Suspense fallback={<TeamCardsSkeleton />}>
          <TeamCards />
        </Suspense>
      </div>
    </div>
  </>);
}
  