'use client'
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { UserSchemaZod } from "./adduser";
import useApi from "@/components/global/useApi";
import useStorePage from "@/components/global/store";


export interface UserSchemaUpdate {
    name: string,
    email: string,
    type: string,
    gender: string,
    idData: string
}



const DeleteUser: React.FC<UserSchemaUpdate> = ({ name, email, gender, type,  idData }) => {

    const router = useRouter()

    const{currentPage} = useStorePage()
    const {usuario, refetch} = useApi(currentPage)


    const defaultValues: Partial<UserSchemaUpdate> = {
        name: name,
        email: email,
        gender: gender,
        type: type
    }

    const { toast } = useToast()
    const form = useForm<UserSchemaUpdate>({ resolver: zodResolver(UserSchemaZod), defaultValues, mode: 'onChange' })



    const onSubmit: SubmitHandler<UserSchemaUpdate> = async (dataAll) => {
        const data = { ...dataAll, idData };
    
        try {
            const response = await axios.delete(`/api/users/${idData}`);
            console.log('Response data:', response.data);
            toast({
                variant: 'default',
                description: 'User deleted successfully',
            });
            if (response.status === 200 ) {
                refetch()
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast({
                variant: 'destructive',
                description: 'Failed to delete user',
            }); 
        }

    }


    return (

                <Form {...form}>
                    <form className="flex-col flex gap-6 mx-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <Button variant={"ghost"} type="submit">delete</Button>
                    </form>
                </Form>

    )
}

export default DeleteUser
