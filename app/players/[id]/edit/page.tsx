'use client';

import { playerService } from "@/app/lib/api-services";
import PlayerBanner from "@/app/ui/playerBanner/playerBanner";
import PlayerForm from "@/app/ui/playerForm/PlayerForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PlayerFormType, Team } from "@/app/lib/models";

export default function Page() {
    const { id }: { id: string } = useParams();
    const [ selectedTeam, setSelectedTeam ] = useState<Team>();
    const [formDataState, setFormDataState] = useState<PlayerFormType>();
    useEffect(() => {
        playerService.getPlayerById(id)
        .then(player => {
            if(!player) return;
            setSelectedTeam(player.team);
            setFormDataState({
                id: player._id,
                profileUrl: player.profileUrl,
                firstName: player.firstName,
                lastName: player.lastName,
                nationality: player.nationality,
                dateOfBirth: player.dateOfBirth,
                team: player.team?._id,
                shirtNumber: player.shirtNumber,
                joinedTeam: player.joinedTeam,
                position: player.position,
                section: player.section,
            })
        })
    }, [])

    return(<>    
     {formDataState && <>
        <PlayerBanner
          firstName={formDataState.firstName}
          lastName={formDataState.lastName}
          shirtNumber={formDataState.shirtNumber}
          color={selectedTeam?.teamColor}
          profileUrl={formDataState?.profileUrl}
        />
        <PlayerForm 
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            formDataState={formDataState}
            setFormDataState={setFormDataState}
        />
        </>
    }
        
    </>)
}