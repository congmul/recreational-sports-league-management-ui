"use client";

import { Coach, TeamFormType } from "@/app/lib/models";
import { useEffect, useState } from "react";
import ColorPicker from "../colorPicker/ColorPicker";
import { coachService, playerService, teamService } from "@/app/lib/api-services";
import DropdownWithJump from "../dropdown/Dropdown";
import { useRouter } from 'next/navigation';
import { fileToDataUrl } from "@/app/lib/utils";
import Image from 'next/image';
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import MultiSelectDropdown from "../multi-select-dropdown/MultiSelectDropdown";

interface TeamFormProps {
    isCreate?: boolean
    editFormDataState?: TeamFormType
  }

export default function TeamForm({isCreate, editFormDataState}: TeamFormProps){
    const [ formDataState, setFormDataState ] = useState<TeamFormType>(() => {
        if(isCreate || !editFormDataState){
            return ({  
                _id: "",
                name: "",
                tla: "",
                crest: "",
                teamColor: "",
                baseCity: "",
                establish: new Date().toISOString(),
                homeStadium: "",
                players: [],
                maxNumber: 25,
                coach: "",
            })
        }else{
            return editFormDataState;
        }
    });
    const [ selectedTeamColor, setSelectedTeamColor ] = useState("#fd2626");
    const [ coaches, setCoaches ] = useState<Coach[]>();
    const [ multiSelectionOptions, setMultiSelectionOptions ] = useState<{id:string, value:string}[]>();
    const [ selectedCoach, setSelectedCoach ] = useState<Coach>();
    const [ selectedPlayer, setSelectedPlayer ] = useState<string[]>([]);
    const [ coachesList, setCoachesList] = useState<string[]>([]);
    const [ uploadedImg, setUploadedImg ] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        coachService.getAllCoaches()
        .then((coachesRes) => {
            setCoaches(coachesRes);
            const coachesList = coachesRes?.map(coach => `${coach.firstName} ${coach.lastName}`);
            if(coachesList) setCoachesList([...coachesList, 'Unselect']);
        })
        playerService.getAllPlayers()
        .then((players) => {
            const options = players?.map(player => ({id: player._id, value: `${player.firstName} ${player.lastName}`}))
            setMultiSelectionOptions(options)
        })
    }, [])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        let maxNumber:number = 0;
        if(name === 'maxNumber'){
            if(isNaN(parseInt(value))){
                maxNumber = 0
            }else{
                maxNumber = parseInt(value)
            }
        }        
        setFormDataState({ ...formDataState, [name]: name === 'maxNumber' ? maxNumber : value });
      };


    async function formSubmitHandle(e: React.FormEvent<HTMLButtonElement>){
        e.preventDefault();

        const teamBody = {...formDataState, teamColor: selectedTeamColor, coach: selectedCoach?._id || ""}
        if(isCreate){            
            const res = await teamService.createTeam(teamBody);
            if(res){
                router.push(`/teams/${res._id}`)
            }
        }else{
            const res = await teamService.updateTeam(teamBody);
            if(res){
                router.push(`/teams/${res._id}`)
            }
        }
    }
    return(<>
    <div className="bg-white rounded-md p-5">
        <form
            className="max-w-lg lg:max-w-xl mx-auto p-6"
        >
            <div className="flex justify-between mb-4">
                <div className="grow mr-4 relative">
                    {
                        uploadedImg !== "" &&
                        <div className="absolute top-[30px] right-[10px] bg-white cursor-pointer"
                            onClick={() => {setUploadedImg("")}}
                        >
                            <MinusCircleIcon className="w-8 text-red-500" />
                        </div>
                    }
                    <label className="block text-sm font-medium mb-1" htmlFor="crest">
                        Crest
                    </label>                    
                        <Image className="p-4 h-[170px]" src={uploadedImg === "" ? "/assets/img/team-logo/logo-missing-img.png" : uploadedImg } width={300} height={300} alt={'Crest'} />
                        <label htmlFor="image" className="p-4 flex items-center cursor-pointer hover:underline">
                            <PlusCircleIcon className="w-8" />
                            <span className="ml-3">Add Crest Image</span>
                        </label>
						<input
							id="image"
                            className="hidden"
							type="file"
							name="image"
							accept="image/*"
                            onChange={async (e) => {
                                if(e.target.files){                                    
                                    const imageUrl = await fileToDataUrl(e.target.files["0"] as File as File);
                                    setUploadedImg(imageUrl);
                                }
                            }}
						/>
                </div>
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="teamColor">
                        Team Color
                    </label>
                    <ColorPicker setSelectedTeamColor={setSelectedTeamColor} />
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Team Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Tottenham Hotspur F.C."
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={handleChange}
                        value={formDataState.name}
                    />
                </div>
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="tla">
                        TLA (Three-Letter Acronym)
                    </label>
                    <input
                        type="text"
                        id="tla"
                        name="tla"
                        placeholder="TOT"
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={handleChange}
                        value={formDataState.tla}
                    />
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="coach">
                        Coach
                    </label>
                    <DropdownWithJump
                        label={selectedCoach == null ? "Select a coach" : `${selectedCoach.firstName} ${selectedCoach.lastName}`}
                        options={coachesList}
                        onSelect={ (value: string) => {
                            if(!coaches) return;                                
                            const coach = coaches.find(coach => `${coach.firstName} ${coach.lastName}` === value);
                            setSelectedCoach(coach);
                        }}
                    />
                </div>
                <div className="grow basis-[150px]  mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="players">
                        Players
                    </label>
                    <MultiSelectDropdown 
                        options={multiSelectionOptions || []} 
                        onSelect={(selections) => { setFormDataState({...formDataState, players: selections.map(selection => (selection.id))})}}
                    />
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="homeStadium">
                        Home Stadium
                    </label>
                    <input
                        type="text"
                        id="homeStadium"
                        name="homeStadium"
                        placeholder="Tottenham Hotspur Stadium"
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={handleChange}
                        value={formDataState.homeStadium}
                    />
                </div>
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="baseCity">
                        Base City
                    </label>
                    <input
                        type="text"
                        id="baseCity"
                        name="baseCity"
                        placeholder="London"
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={handleChange}
                        value={formDataState.baseCity}
                    />
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="establish">
                        Establish
                    </label>
                        <input
                            type="date"
                            id="establish"
                            name="establish"
                            value={formDataState?.establish.split("T")[0]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 h-[42px]"
                        />
                </div>
            </div>
            <button
                className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700"
                onClick={formSubmitHandle}
            >
                Submit
            </button>
        </form>
    </div>    
    </>)
}