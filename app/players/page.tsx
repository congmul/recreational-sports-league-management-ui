import Banner from '@/app/ui/banner/banner';
import PlayerTable from '@/app/ui/table/playerTable';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import LinkCircleButton from "@/app/ui/link-circle-button/LinkCircleButton";

export default async function Page() {
    return (<>
      <div className="team-page-wrapper">
        <Banner title={'Players'} />
        <div className="mt-4 relative">
          <Suspense fallback={<TableSkeleton />}>
            <PlayerTable />
          </Suspense>
        </div>
        <LinkCircleButton title='Add new player' url="/players/create" />
      </div>
    </>
    );
  }
  