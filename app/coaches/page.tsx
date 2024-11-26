import Banner from '@/app/ui/banner/banner';
import CoachTable from '@/app/ui/table/CoachTable';
import { Suspense } from 'react';
import { TableSkeleton } from '../ui/skeletons';
import LinkCircleButton from "@/app/ui/link-circle-button/LinkCircleButton";

export default async function Page() {
    return (<>
      <div className="team-page-wrapper">
        <Banner title={'Coaches'} />
        <div className="mt-4 relative">
          <Suspense fallback={<TableSkeleton />}>
            <CoachTable />
          </Suspense>
        </div>
        <LinkCircleButton title='Add new coach' url="/coaches/create" />
      </div>
    </>
    );
  }
  