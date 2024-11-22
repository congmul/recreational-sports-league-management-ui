import Banner from '@/app/ui/banner/banner';
import Table from '@/app/ui/table/table';
import { playerService } from '../lib/api-services';

export default async function Page() {
  const players = await playerService.getAllPlayers();

    return (
      <div className="team-page-wrapper">
        <Banner title={'Players'} />
        <div className="mt-4">
        {players && <Table players={players}/>}
        </div>
      </div>
    );
  }
  