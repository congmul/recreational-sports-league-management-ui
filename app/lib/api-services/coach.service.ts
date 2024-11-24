import { Coach } from '@/app/lib/models'
import axiosInstance from '@/app/lib/utils/axiosIntercepter';

export const coachService = {
    getAllCoaches: async ():Promise<Coach[] | undefined> => {
        try{
            const { data } = await axiosInstance.get(`/coach`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    getCoach: async (id: string):Promise<Coach | undefined> => {
        try{
            const { data } = await axiosInstance.get(`/coach/${id}`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
    deleteCoachById: async (id: string):Promise<{status: number, message: string} | undefined> => {
        try{
            const { data } = await axiosInstance.delete(`/coach/${id}`,);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
}