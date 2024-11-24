import { Player } from '@/app/lib/models'
import axiosInstance from '@/app/lib/utils/axiosIntercepter';

export const playerService = {
    getAllPlayers: async ():Promise<Player[] | undefined> => {
        try{
            const { data } = await axiosInstance.get(`/player`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    getPlayerById: async (id: string):Promise<Player | undefined> => {
        try{
            const { data } = await axiosInstance.get(`/player/${id}`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    deletePlayerById: async (id: string):Promise<{status: number, message: string} | undefined> => {
        try{
            const { data } = await axiosInstance.delete(`/player/${id}`,);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
}