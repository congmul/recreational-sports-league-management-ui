'use client';

import { teamService } from "@/app/lib/api-services";
import { TeamFormType } from "@/app/lib/models";
import Banner from "@/app/ui/banner/banner";
import TeamForm from "@/app/ui/teamForm/TeamForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(){
    const { teamId }: { teamId: string } = useParams();
    const [formDataState, setFormDataState] = useState<TeamFormType>();

    useEffect(() => {
        teamService.getTeamWithoutPopulate(teamId)
        .then(team => {
            if(!team) return;
            setFormDataState({
                _id: team._id,
                name: team.name,
                tla: team.tla,
                crest: team.crest,
                teamColor: team.teamColor,
                baseCity: team.baseCity,
                establish: team.establish,
                homeStadium: team.homeStadium,
                players: team.players,
                maxNumber: team.maxNumber,
                coach: team.coach,
            })
        })
    }, [])
    return(<>
        {
            formDataState && <>
                <Banner isTeamDetail={true} title={formDataState.name} color={formDataState.teamColor} tla={formDataState.tla} est={formDataState.establish} stadium={formDataState.homeStadium} baseCity={formDataState.baseCity} logoUrl={formDataState.crest} />
                <TeamForm editFormDataState={formDataState} />
            </>
        }
        Team Editing
    </>)
}