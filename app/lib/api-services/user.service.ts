import axios from 'axios';
const coreServiceUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL;
import { Auth } from '@/app/lib/models'

export const userService = {
    login: async (body: {email: string, password: string}):Promise<Auth | undefined> => {
        try{
            const { data } = await axios.post(`${coreServiceUrl}/auth/login`, body);
            return data;            
        }catch(err){
            console.log(err);
        }
    }
}