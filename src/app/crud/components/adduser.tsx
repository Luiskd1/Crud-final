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
import { Label } from "@/components/ui/label"
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useRouter } from "next/navigation"
import useApi from "@/components/global/useApi"
import useStorePage from "@/components/global/store"
import { UserSchemaUpdate } from "./updateUser"





export interface UserSchema {
    name: string,
    email: string,
    type: TypeEnum
    gender: GenderEnum
}

export enum TypeEnum {
    admin = "admin",
    user = "user",
}

export enum GenderEnum {
    female = "female",
    male = "male",
    other = "other",
}

export const UserSchemaZod = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    type: z.string({
        required_error: "Please select an type to display.",
    }),
    gender: z.string({
        required_error: "Please select an gender to display.",
    })
});



const AddUser = () => {

    const defaultValues: Partial<UserSchemaUpdate> = {
        name: "",
        email: "",
        gender: "",
        type: ""
    }

    const { toast } = useToast()
    const form = useForm<UserSchemaUpdate>({ resolver: zodResolver(UserSchemaZod), defaultValues })
    const { reset } = form;
    const router = useRouter()
    const { currentPage } = useStorePage()
    const { refetch } = useApi(currentPage)

    




    const onSubmit: SubmitHandler<UserSchemaUpdate> = async (data) => {
        try {
            const response = await axios.post('/api/users', data);
            console.log('Response data:', response.data);
            toast({
                variant: "default",
                description: "New user created successfully",
            });
            if (response.status === 200) {
                refetch()
                const { gender, ...dataWithoutGender } = data;
                reset(dataWithoutGender); 
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast({
                variant: 'destructive',
                description: 'Failed to create user',
            });
        }
    };


    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline">+ Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        add new person&apos;s here. Click save when you&apos;re done.
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
                                        <Input placeholder="Name" {...field} />
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
                                        <Input placeholder="Email" {...field} />
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
                            <Button type="submit">Submit</Button>


                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}

export default AddUser