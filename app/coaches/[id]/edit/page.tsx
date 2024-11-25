'use client';

import { coachService } from "@/app/lib/api-services";
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
        coachService.getCoach(id)
        .then(coach => {
            if(!coach) return;
            setSelectedTeam(coach.team);
            setFormDataState({
                id: coach._id,
                profileUrl: coach.profileUrl,
                firstName: coach.firstName,
                lastName: coach.lastName,
                nationality: coach.nationality,
                dateOfBirth: coach.dateOfBirth,
                team: coach.team?._id,
                joinedTeam: coach.joinedTeam,
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
            isCoach={true}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            formDataState={formDataState}
            setFormDataState={setFormDataState}
        />
        </>
    }
        
    </>)
}