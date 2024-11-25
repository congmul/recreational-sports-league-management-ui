import Banner from '@/app/ui/banner/banner';
import CoachTable from '@/app/ui/table/CoachTable';
import { Suspense } from 'react';
import { TableSkeleton } from '../ui/skeletons';
import AddButtonLink from '../ui/add-button-link/AddButtonLink';

export default async function Page() {
    return (<>
      <div className="team-page-wrapper">
        <Banner title={'Coaches'} />
        <div className="mt-4 relative">
          <Suspense fallback={<TableSkeleton />}>
            <CoachTable />
          </Suspense>
        </div>
        <AddButtonLink title='Add new coach' url="/coaches/create" />
      </div>
    </>
    );
  }
  