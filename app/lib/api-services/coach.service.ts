import axios from 'axios';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;
import { Coach } from '@/app/lib/models'

export const coachService = {
    getAllCoaches: async ():Promise<Coach[] | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/coach`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    getCoach: async (id: string):Promise<Coach | undefined> => {
        try{
            const { data } = await axios.get(`${coreServiceUrl}/coach/${id}`);
            return data;            
        }catch(err){
            console.log(err);
        }
    }
}