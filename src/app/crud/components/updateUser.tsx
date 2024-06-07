'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GenderEnum, TypeEnum, UserSchema, UserSchemaZod } from "./adduser"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import useApi from "@/components/global/useApi"
import useStorePage from "@/components/global/store"

export interface UserSchemaUpdate {
    idData: string;
    name?: string;
    email?: string;
    type?: string;
    gender?: string;
}




const UpdateUser: React.FC<UserSchemaUpdate> = ({ name, email, gender, type, idData, }) => {

    const router = useRouter()

    const defaultValues: Partial<UserSchemaUpdate> = {
        name: name,
        email: email,
        gender: gender,
        type: type
    }

    const{currentPage} = useStorePage()
    const {refetch} = useApi(currentPage)

    const { toast } = useToast()
    const form = useForm<UserSchemaUpdate>({ resolver: zodResolver(UserSchemaZod), defaultValues, mode: 'onChange' })



    const onSubmit: SubmitHandler<UserSchemaUpdate> = async (data) => {

        try {
            const response = await axios.put(`/api/users/${idData}`, data);
            console.log('Response data:', response.data);
            toast({
                variant: 'default',
                description: 'User updated successfully',
            });

            if (response.status === 200) {

                refetch() // Recarga la página actual
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast({
                variant: 'destructive',
                description: 'Failed to update the user',
            });
        }

    }


    return (
        <Dialog >

            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>
                        Edit user details here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>

                    <form className="flex-col flex gap-6 mx-8" onSubmit={form.handleSubmit(onSubmit)}>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email"  {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a gender to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={GenderEnum.male}>{GenderEnum.male}</SelectItem>
                                            <SelectItem value={GenderEnum.female}>{GenderEnum.female}</SelectItem>
                                            <SelectItem value={GenderEnum.other}>{GenderEnum.other}</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={TypeEnum.admin}>{TypeEnum.admin}</SelectItem>
                                            <SelectItem value={TypeEnum.user}>{TypeEnum.user}</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogClose asChild>
                            <Button type="submit">Update</Button>
                        </DialogClose>

                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}

export default UpdateUser
