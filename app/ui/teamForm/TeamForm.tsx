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
import { azureStorageService } from "@/app/lib/api-services/azure-storage.service";
import Spinner from "../spinner/spinner";

interface TeamFormProps {
    isCreate?: boolean
    editFormDataState?: TeamFormType
  }

export default function TeamForm({isCreate, editFormDataState}: TeamFormProps){
    const [isLoading, setIsLoading] = useState(false);
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
    const [ coachesList, setCoachesList] = useState<string[]>([]);
    const [ uploadedImg, setUploadedImg ] = useState<string>("");
    const [ imgFormData, setImgFormData ] = useState<FormData>();
    const router = useRouter();

    useEffect(() => {
        coachService.getAllCoaches()
        .then((coachesRes) => {
            setCoaches(coachesRes);
            const coachesList = coachesRes?.map(coach => `${coach.firstName} ${coach.lastName}`);
            if(coachesList) setCoachesList([...coachesList, 'Unselect']);

            if(!isCreate && coachesRes) {
                if(editFormDataState?.coach){
                    const coach = coachesRes.find(coach => coach._id === editFormDataState?.coach);
                    setSelectedCoach(coach)
                }
            }
        })
        playerService.getAllPlayers()
        .then((players) => {
            const options = players?.map(player => ({id: player._id, value: `${player.firstName} ${player.lastName}`}))
            setMultiSelectionOptions(options)
        })

        if(!isCreate){
            setUploadedImg(editFormDataState?.crest || "")
            setSelectedTeamColor(editFormDataState?.teamColor || "#fd2626")
        }
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
        try{
            e.preventDefault();
            setIsLoading(true);
            let crestImgUrl;
            if(imgFormData){
                const result = await azureStorageService.uploadImage(imgFormData);
                if(result) crestImgUrl = result.url
            }
    
            const teamBody = {...formDataState, teamColor: selectedTeamColor, coach: selectedCoach?._id || "", crest: crestImgUrl || "" }
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
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
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
                            onClick={() => {setUploadedImg(""); setImgFormData(undefined)}}
                        >
                            <MinusCircleIcon className="w-8 text-red-500" />
                        </div>
                    }
                    <label className="block text-sm font-medium mb-1" htmlFor="crest">
                        Crest
                    </label>                    
                        <Image className="p-4 h-[170px]" 
                            src={
                                uploadedImg !== "" 
                                ? uploadedImg
                                : formDataState.crest 
                                    ? formDataState.crest 
                                    : "/assets/img/team-logo/logo-missing-img.png"                             
                            } 
                            width={300} height={300} alt={'Crest'} />
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
                                    const imageFile = e.target.files["0"] as File;                           
                                    const imageUrl = await fileToDataUrl(imageFile);
                                    const formData = new FormData();
                                    formData.append('file', imageFile)
                                    setImgFormData(formData);
                                    setUploadedImg(imageUrl);
                                }
                            }}
						/>
                </div>
                <div className="grow mr-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="teamColor">
                        Team Color
                    </label>
                    <ColorPicker initColor={selectedTeamColor} setSelectedTeamColor={setSelectedTeamColor} />
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
                        initialSelections={formDataState.players}
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
                className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
                onClick={formSubmitHandle}
            >
                Submit
              {
                isLoading &&  <span className="ml-3"><Spinner size={"h-4"} color="white" /></span>
              }
            </button>
        </form>
    </div>    
    </>)
}