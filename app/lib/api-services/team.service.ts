import { Team, TeamFormType } from '@/app/lib/models'
import axiosInstance from '@/app/lib/utils/axiosIntercepter';

export const teamService = {
    getAllTeams: async ():Promise<Team[] | undefined> => {
        try{
            const { data } = await axiosInstance.get(`/team`);            
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    getTeam: async (id: string):Promise<Team | undefined> => {
        try{
            const { data } = await axiosInstance.get(`/team/${id}`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    createTeam: async (body: TeamFormType):Promise<Team | undefined> => {
        try{
            const { _id, ...rest} = body;
            const { data } = await axiosInstance.post(`/team`, rest);
            return {_id, ...data};            
        }catch(err){
            console.log(err);
        }
    },
}