import { Auth } from '@/app/lib/models'
import axiosInstance from '@/app/lib/utils/axiosIntercepter';

export const userService = {
    login: async (body: {email: string, password: string}):Promise<Auth | undefined> => {
        try{
            const { data } = await axiosInstance.post(`/auth/login`, body);
            return data;            
        }catch(err){
            console.log(err);
        }
    }
}