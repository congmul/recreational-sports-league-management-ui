import Card from '@/app/ui/card/card';
import { teamService } from '../lib/api-services';
import Banner from '@/app/ui/banner/banner';
import Link from 'next/link';

export default async function Page() {
  const teams = await teamService.getAllTeams();
  return (<>
    <div className="team-page-wrapper">
      <Banner title={'Teams'} />
      <div className="flex flex-wrap justify-center">
        {
          teams && teams.map(team => {
            return(
              <Link key={team._id} href={`teams/${team._id}`}>
                <Card logo={team.crest} tla={team.tla} name={team.name} />
              </Link>
            )
          })
        }
      </div>
    </div>
  </>);
}
  