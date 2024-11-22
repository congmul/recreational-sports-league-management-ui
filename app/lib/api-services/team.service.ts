import axios from 'axios';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;
import { Team } from '@/app/lib/models'

export const teamService = {
    getAllTeams: async ():Promise<Team[] | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/team`);            
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    getTeam: async (id: string):Promise<Team | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/team/${id}`);
            return data;            
        }catch(err){
            console.log(err);
        }
    }
}