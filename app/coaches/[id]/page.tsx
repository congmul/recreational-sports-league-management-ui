import { coachService } from "@/app/lib/api-services";
import PlayerBanner from "@/app/ui/playerBanner/playerBanner";
import PlayerDetail from "@/app/ui/playerDetail/playerDetail";

interface CoachDetailProps {
    params: Promise<{ id: string }>
}

export default async function Page({params}:CoachDetailProps) {
    const { id } = await params;

    const coach = await coachService.getCoach(id)

    return(<>    
    {
        coach && <>
            <PlayerBanner 
            firstName={coach.firstName}
            lastName={coach.lastName}
            color={coach.team?.teamColor}
            profileUrl={coach?.profileUrl}
            />    
            <PlayerDetail
                id={coach._id}
                name={`${coach.firstName} ${coach.lastName}`}
                nationality={coach.nationality}
                dateOfBirth={coach.dateOfBirth}
                teamName={coach.team?.name}
                teamLogoUrl={coach.team?.crest}
                joinedTeam={coach.joinedTeam}
                isCoach={true}
            />
        </>
    }
    </>)
}