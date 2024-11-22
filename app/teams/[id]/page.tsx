import { teamService } from "@/app/lib/api-services"
import Banner from "@/app/ui/banner/banner"

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
        {team && <Banner isTeamDetail={true} title={team.name} color={team.teamColor} tla={team.tla} est={team.establish} stadium={team.homeStadium} baseCity={team.baseCity} logoUrl={team.crest} />}
        Team Detail
        Post: {id}
    </>)
}