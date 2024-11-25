'use client';

import PlayerBanner from "@/app/ui/playerBanner/playerBanner";
import PlayerForm from "@/app/ui/playerForm/PlayerForm";
import { useState } from "react";
import { PlayerFormType, Team } from "@/app/lib/models";

export default function Page() {
  const [ selectedTeam, setSelectedTeam ] = useState<Team>();
  const [ formDataState, setFormDataState ] = useState<PlayerFormType | undefined>(() => ({
    id: '',
    profileUrl: '',
    firstName: 'firstName',
    lastName: 'lastName',
    nationality: 'South Korea',
    dateOfBirth: new Date().toISOString(),
    team: undefined, // Team Id
    shirtNumber: 1,
    joinedTeam: new Date().toISOString(),
    position: 'goalkeeper',
    section: undefined,
  }));

    return (<>
      {formDataState && <>
        <PlayerBanner
          firstName={formDataState.firstName}
          lastName={formDataState.lastName}
          shirtNumber={formDataState.shirtNumber}
          color={selectedTeam?.teamColor || "red"}
          profileUrl={formDataState?.profileUrl || ""}
        />
        <PlayerForm 
            isCreate={true}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            formDataState={formDataState}
            setFormDataState={setFormDataState}
        />
        </>
      }
    </>
    );
  }
  