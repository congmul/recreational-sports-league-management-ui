'use client';

import { SetStateAction, useEffect, useState } from "react";
import { positions, nationalities } from "@/app/lib/const.data";
import Dropdown from "../dropdown/Dropdown";
import { capitalizeFirstLetter } from "@/app/lib/utils";
import { coachService, playerService, teamService } from "@/app/lib/api-services";
import { PlayerFormType, Team } from "@/app/lib/models";
import { useRouter } from 'next/navigation';

interface PlayerFormProps {
    isCreate?: boolean
    isCoach?: boolean,
    selectedTeam?: Team,
    setSelectedTeam: React.Dispatch<SetStateAction<Team | undefined>>
    formDataState: PlayerFormType
    setFormDataState: React.Dispatch<SetStateAction<PlayerFormType | undefined>>
  }

export default function PlayerForm({
    isCreate,
    formDataState,
    setFormDataState,
    isCoach,
    selectedTeam,
    setSelectedTeam
}:PlayerFormProps){
    const [teamList, setTeamList] = useState<string[]>([]);
    const [ teams, setTeams ] = useState<Team[]>();
    const router = useRouter();
    useEffect(() => {
        teamService.getAllTeams()
        .then((teamRes) => {
            setTeams(teamRes);
            const teamList = teamRes?.map(team => team.name);
            if(teamList) setTeamList([...teamList, 'Unselect']);
        })
    }, [])
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        let shirtValue:number = 0;
        if(name === 'shirtNumber'){
            isNaN(parseInt(value)) ? shirtValue = 0 : shirtValue = parseInt(value)
        }
        setFormDataState({ ...formDataState, [name]: name === 'shirtNumber' ? shirtValue : value });
      };

    async function formSubmitHandle(e: React.FormEvent<HTMLButtonElement>){
        e.preventDefault();
        if(isCreate){
            // Create
            if(isCoach){
                const coachBody = formDataState.team ? {...formDataState, teamName: selectedTeam?.name, crest: selectedTeam?.crest} : {...formDataState}
                const res = await coachService.createCoach(coachBody);
                res && router.push(`/coaches/${res._id}`)
            }else{                
                const res = await playerService.createPlayer(formDataState);                
                res && router.push(`/players/${res._id}`)
            }

        }else{
            if(isCoach){
                const coachBody = formDataState.team ? {...formDataState, teamName: selectedTeam?.name, crest: selectedTeam?.crest} : {...formDataState}
                await coachService.updateUpdateById(coachBody);
                router.push(`/coaches/${formDataState.id}`)
            }else{
                await playerService.updatePlayerById(formDataState);
                router.push(`/players/${formDataState.id}`)
            }
        }

    }
    return(
        <div className="bg-white rounded-md p-5">
          <h2 className="text-lg font-bold text-indigo-900 mb-4">Personal Details Form</h2>          
          <form
                className="max-w-lg lg:max-w-xl mx-auto p-6"
            >
                <div className="flex justify-between mb-4">
                    <div className="grow mr-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First name"
                            className="w-full border border-gray-300 rounded-md p-2"
                            onChange={handleChange}
                            value={formDataState.firstName}
                        />
                    </div>
                    <div className="grow">
                        <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last name"
                            className="w-full border border-gray-300 rounded-md p-2"
                            onChange={handleChange}
                            value={formDataState.lastName}
                        />
                    </div>
                </div>

                <div className="flex justify-between mb-4">
                    <div className="grow basis-[175px] mr-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="nationality">
                        Nationality
                        </label>
                        <Dropdown
                            label={!formDataState.nationality ? "Select a nationality" : formDataState.nationality}
                            options={nationalities}
                            onSelect={ (value: string) => {
                                setFormDataState({ ...formDataState, nationality: value });
                            }}
                        />
                        {/* Hidden input to send the dropdown value */}
                        <input
                            type="hidden"
                            name="nationality" // The name attribute must match the API request key
                            value={formDataState.nationality}
                        />
                    </div>
                    {
                        !isCoach &&
                        <div className="grow basis-[55px] mr-3">
                            <label className="block text-sm font-medium mb-1" htmlFor="shirtNumber">
                                Shirt Number
                            </label>
                            <input
                                type="number"
                                min="0"
                                id="shirtNumber"
                                name="shirtNumber"
                                placeholder="7"
                                className="w-full border border-gray-300 rounded-md p-2"
                                onChange={handleChange}
                                value={formDataState.shirtNumber}
                            />
                        </div>
                    }

                    <div className="grow">
                        <label className="block text-sm font-medium mb-1" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formDataState.dateOfBirth && formDataState.dateOfBirth.split("T")[0]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 h-[42px]"
                        />
                    </div>
                </div>
                
                <div className="flex justify-between mb-4">
                    <div className="grow basis-[175px] mr-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="teamName">
                            Team
                        </label>
                        <Dropdown
                            label={selectedTeam == null ? "Select a team" : selectedTeam.name}
                            options={teamList}
                            onSelect={ (value: string) => {
                                if(!teams) return;                                
                                const team = teams.find(team => team.name === value);
                                if(team){
                                    setFormDataState({ ...formDataState, team: team._id });
                                    setSelectedTeam(team);
                                }else{
                                    setFormDataState({ ...formDataState, team: undefined });
                                    setSelectedTeam(undefined);
                                }
                            }}
                        />
                        {/* Hidden input to send the dropdown value */}
                        <input
                            type="hidden"
                            name="teamName" // The name attribute must match the API request key
                            value={selectedTeam?.name || ""}
                        />
                    </div>
                    
                    <div className="grow">
                        <label className="block text-sm font-medium mb-1" htmlFor="joinedTeam">
                            Joined Team
                        </label>
                        <input
                            type="date"
                            id="joinedTeam"
                            name="joinedTeam"
                            value={formDataState.joinedTeam && formDataState.joinedTeam.split("T")[0]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 h-[42px]"
                        />
                    </div>
                </div>
                            
                {
                    !isCoach &&
                    <div className="flex justify-between mb-4">
                        <div className="grow basis-[215px] mr-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="position">
                                Position
                            </label>
                            <Dropdown
                                label={!formDataState.position ? "Select a position" : capitalizeFirstLetter(formDataState.position)}
                                options={positions}
                                onSelect={ (value: string) => {
                                    setFormDataState({ ...formDataState, position: value });
                                }}
                            />
                            {/* Hidden input to send the dropdown value */}
                            <input
                                type="hidden"
                                name="position" // The name attribute must match the API request key
                                value={formDataState.position}
                            />
                        </div>

                        <div className="grow">
                            <label className="block text-sm font-medium mb-1" htmlFor="section">
                                Section
                            </label>
                            <input
                                type="text"
                                id="section"
                                name="section"
                                placeholder="Left Winger"
                                value={formDataState.section}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>
                }

            <button
                className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700"
                onClick={formSubmitHandle}
            >
                Submit
            </button>
            </form>
        </div>)
}