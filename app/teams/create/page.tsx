import Banner from '@/app/ui/banner/banner';
import TeamForm from '@/app/ui/teamForm/TeamForm';

export default async function Page() {
    return (<>
      <div className="team-page-wrapper">
        <Banner title={'Build a new team'} />
        <div className="mt-4 relative">
            <TeamForm isCreate={true} />
        </div>
      </div>
    </>
    );
  }
  