import { Coach } from '@/app/lib/models'
import axiosInstance from '@/app/lib/utils/axiosIntercepter';
import { CoachFormType } from '../models/coach';

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
    createCoach: async (body: CoachFormType):Promise<Coach | undefined> => {
        try{
            const { id, ...rest} = body;
            const { data } = await axiosInstance.post(`/coach`, rest);
            return {_id: id, ...data};
        }catch(err){
            console.log(err);
        }
    },

    updateUpdateById: async (body: CoachFormType) => {
        try{
            const { id, ...rest} = body;
            await axiosInstance.patch(`/coach/${id}`, rest);
            return id;            
        }catch(err){
            console.log(err);
        }
    },
    deleteCoachById: async (id: string):Promise<{status: number, message: string} | undefined> => {
        try{
            const { data } = await axiosInstance.delete(`/coach/${id}`);
            return data;            
        }catch(err){
            console.log(err);
        }
    },
}