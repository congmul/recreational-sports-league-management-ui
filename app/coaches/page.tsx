import Banner from '@/app/ui/banner/banner';
import CoachTable from '@/app/ui/table/CoachTable';
import { coachService } from '../lib/api-services';
export default async function Page() {
  const coaches = await coachService.getAllCoaches();

    return (<>
      <div className="team-page-wrapper">
        <Banner title={'Coaches'} />
        <div className="mt-4">
        {coaches && <CoachTable coaches={coaches}/>}
        </div>
      </div>
    </>
    );
  }
  