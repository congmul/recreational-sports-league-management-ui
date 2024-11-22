import { teamService } from "@/app/lib/api-services"
import Banner from "@/app/ui/banner/banner"
import { teamColorMap } from '@/app/lib/const-data';

interface TeamDetailProps {
    params: { id: string }
}

export default async function Page({ params }: TeamDetailProps) {
    // It follows https://nextjs.org/docs/messages/sync-dynamic-apis
    // Should use "await".
    const { id } = await params
    const team = await teamService.getTeam(id)
    console.log(team)
    return(<>
        {team && <Banner isTeamDetail={true} title={team.name} color={teamColorMap[team.tla]} tla={team.tla} est={team.establish} stadium={team.homeStadium} />}
        Team Detail
        Post: {id}
    </>)
}