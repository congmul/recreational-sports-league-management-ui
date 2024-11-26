import axiosInstance from '@/app/lib/utils/axiosIntercepter';

export const azureStorageService = {
    uploadImage: async (formData: FormData):Promise<{url: string} | undefined> => {
        try{
            const { data } = await axiosInstance.post(`/azure-storage`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return data;            
        }catch(err){
            console.log(err);
        }
    },
}