import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useApi = (currentPage:number) => {

    const dataFind = async (page: number) => {
        try {
            const dataChat = await axios.get(`/api/users?page=${page}&limit=100`);
            return dataChat.data; // Retorna los datos de la respuesta
        } catch (error) {
            console.log(error) // Lanza el error si ocurre alguno
            return { error: 'Error fetching data from server' };
        }
    };
    const { data: usuario, isLoading, isError, refetch } = useQuery({
        queryKey: ["DataUser"],
        queryFn: () => dataFind(currentPage),
        
        // Llama a la función dataFind dentro del queryFn
    });
    
    return {usuario, refetch, isLoading}
}

export default useApi

