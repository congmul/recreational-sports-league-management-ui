import { Team, TeamFormType } from '@/app/lib/models'
import axiosInstance from '@/app/lib/utils/axiosIntercepter';
import { TeamWithoutPopulate } from '../models/team';

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
    getTeamWithoutPopulate: async (id: string):Promise<TeamWithoutPopulate | undefined> => {
        try{
            const { data } = await axiosInstance.get(`/team/${id}?populate=without`);
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
    updateTeam: async (body: TeamFormType):Promise<Team | undefined> => {
        try{
            const { _id, ...rest} = body;
            const { data } = await axiosInstance.patch(`/team/${_id}`, rest);
            return {_id, ...data};            
        }catch(err){
            console.log(err);
        }
    },
    deleteTeam: async (id: string) => {
        try{
            await axiosInstance.delete(`/team/${id}`);
            return null;
        }catch(err){
            console.log(err);
        }
    },
}