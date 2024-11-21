import Card from '@/app/ui/card/card';
import { teamService } from '../lib/api-services';

export default async function Page() {
  const teams = await teamService.getAllTeams();
  return (<>
    <div className="m-5 font-bold">
      <div className="flex flex-wrap justify-center">
        {
          teams && teams.map(team => <Card key={team._id} logo={team.crest} tla={team.tla} name={team.name} />)
        }
      </div>
    </div>
  </>);
}
  