import { playerService } from "@/app/lib/api-services";
import PlayerBanner from "@/app/ui/playerBanner/playerBanner";
import PlayerDetail from "@/app/ui/playerDetail/playerDetail"


interface PlayerDetailProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: PlayerDetailProps) {
    const { id } = await params;
    const player = await playerService.getPlayerById(id);
    return(<>    
     {player && <>
        <PlayerBanner
          firstName={player.firstName}
          lastName={player.lastName}
          shirtNumber={player.shirtNumber}
          color={player.team.teamColor}
          profileUrl={player?.profileUrl}
        />
        <PlayerDetail 
            nationality={player.nationality}
            dateOfBirth={player.dateOfBirth}
            teamName={player.team.name}
            teamLogoUrl={player.team.crest}
            joinedTeam={player.joinedTeam}
            position={player.position}
            section={player.section} 
        />
        </>
    }
        
    </>)
}