import Banner from '@/app/ui/banner/banner';
import { TeamCardsSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import TeamCards from '@/app/ui/team/teamCards';
import AddButtonLink from '../ui/add-button-link/AddButtonLink';

export default async function Page() {
  return (<>
    <div className="team-page-wrapper">
      <Banner title={'Teams'} />
      <div className="flex flex-wrap justify-center relative">
        <Suspense fallback={<TeamCardsSkeleton />}>
          <TeamCards />
        </Suspense>
      </div>
      <AddButtonLink title='Add new team' url="/teams/create" />
    </div>
  </>);
}
  