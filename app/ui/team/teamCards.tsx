import Card from '@/app/ui/card/card';
import { teamService } from '@/app/lib/api-services';
import Link from 'next/link';

export default async function TeamCards() {
  const teams = await teamService.getAllTeams();
  return (<>
        {
          teams && teams.map(team => {
            return(
              <Link key={team._id} href={`teams/${team._id}`}>
                <Card logoUrl={team.crest} tla={team.tla} name={team.name} color={team.teamColor} />
              </Link>
            )
          })
        }
  </>);
}
  