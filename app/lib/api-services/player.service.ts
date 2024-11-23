import axios from 'axios';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;
import { Player } from '@/app/lib/models'

export const playerService = {
    getAllPlayers: async ():Promise<Player[] | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/player`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    getPlayerById: async (id: string):Promise<Player | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/player/${id}`);
            return data;            
        }catch(err){
            console.log(err);
        }
    }
}