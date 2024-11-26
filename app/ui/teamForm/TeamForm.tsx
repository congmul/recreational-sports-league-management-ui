"use client";

import { Coach, TeamFormType } from "@/app/lib/models";
import { useEffect, useState } from "react";
import ColorPicker from "../colorPicker/ColorPicker";
import { coachService, teamService } from "@/app/lib/api-services";
import DropdownWithJump from "../dropdown/Dropdown";
import { useRouter } from 'next/navigation';

interface TeamFormProps {
    isCreate?: boolean
  }

export default function TeamForm({isCreate}: TeamFormProps){
    const [ formDataState, setFormDataState ] = useState<TeamFormType>(() => ({  
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
    }));
    const [ selectedTeamColor, setSelectedTeamColor ] = useState("#fd2626");
    const [ coaches, setCoaches ] = useState<Coach[]>();
    const [ selectedCoach, setSelectedCoach ] = useState<Coach>();
    const [ coachesList, setCoachesList] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        coachService.getAllCoaches()
        .then((coachesRes) => {
            setCoaches(coachesRes);
            const coachesList = coachesRes?.map(coach => `${coach.firstName} ${coach.lastName}`);
            if(coachesList) setCoachesList([...coachesList, 'Unselect']);
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
        console.log({...formDataState, teamColor: selectedTeamColor, coach: selectedCoach?._id});
        const teamBody = {...formDataState, teamColor: selectedTeamColor, coach: selectedCoach?._id || ""}
        if(isCreate){
            const res = await teamService.createTeam(teamBody);
            if(res){
                router.push(`/teams/${res._id}`)
            }
        }else{

        }
    }
    return(<>
    <div className="bg-white rounded-md p-5">
        <form
            className="max-w-lg lg:max-w-xl mx-auto p-6"
        >
            <div className="flex justify-between mb-4">
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="crest">
                        Crest
                    </label>
                    <input
                        type="text"
                        id="crest"
                        name="crest"
                        placeholder="Tottenham Hotspur F.C."
                        className="w-full border border-gray-300 rounded-md p-2"
                        onChange={handleChange}
                        value={formDataState.crest}
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
                <div className="grow basis-[175px] mr-4">
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
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="players">
                        Players
                    </label>
                        <input
                            type="text"
                            id="players"
                            name="players"
                            // value={formDataState?.establish.split("T")[0]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 h-[42px]"
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