import Banner from '@/app/ui/banner/banner';
import PlayerTable from '@/app/ui/table/playerTable';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {
    return (<>
      <div className="team-page-wrapper">
        <Banner title={'Players'} />
        <div className="mt-4 relative">
          <Suspense fallback={<TableSkeleton />}>
            <PlayerTable />
          </Suspense>
        </div>
      </div>
    </>
    );
  }
  