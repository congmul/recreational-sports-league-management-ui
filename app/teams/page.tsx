import Card from '@/app/ui/card/card';
import { teamService } from '../lib/api-services';
import Banner from '@/app/ui/banner/banner';

export default async function Page() {
  const teams = await teamService.getAllTeams();
  return (<>
    <div className="team-page-wrapper">
      <Banner title={'Teams'} />
      <div className="flex flex-wrap justify-center">
        {
          teams && teams.map(team => <Card key={team._id} logo={team.crest} tla={team.tla} name={team.name} />)
        }
      </div>
    </div>
  </>);
}
  