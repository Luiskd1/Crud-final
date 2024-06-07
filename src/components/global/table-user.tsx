"use client"
import { connectDB } from "@/utils/db.database"
import user from "@/models/user";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useQuery } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { UserCog } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import React, { useEffect, useState } from "react"
import UpdateUser from "@/app/crud/components/updateUser"
import { SubmitHandler } from "react-hook-form"
import { toast } from "../ui/use-toast"
import DeleteUser from "@/app/crud/components/deleteUser"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import axios from "axios";
import { Input } from "../ui/input";
import AddUser from "@/app/crud/components/adduser";
import useApi from "./useApi";
import useStorePage from "./store";




interface UserSchemaRevi {
    _id: string,
    name: string,
    email: string,
    type: string,
    gender: string
}



const TableUser = () => {

    const { currentPage, setCurrentPage } = useStorePage()
    const limit = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [internalPage, setInternalPage] = useState(1); // Estado interno para la paginación



    const { usuario, refetch, isLoading } = useApi(currentPage)

    console.log(isLoading)

    useEffect(() => {
        refetch(); // Invocar refetch cuando cambie alguna de sus dependencias
    }, [currentPage, refetch]); // Añadir refetch como dependencia



    const filteredUsers = usuario?.users.filter((user: UserSchemaRevi) => {
        const searchFields = [user.name, user.email, user.type, user.gender];
        return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const startIndex = (internalPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, filteredUsers?.length || 0);



    const totalPages = usuario && usuario.totalUsers ? Math.ceil(filteredUsers.length / limit) : 0;

    const handleNextPage = () => {
        if (internalPage < Math.ceil(filteredUsers.length / limit)) {
            setInternalPage(internalPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (internalPage > 1) {
            setInternalPage(internalPage - 1);
        }
    };

    return (
        <div>
            <div className='flex gap-3 py-14'>
                <Input type="text" placeholder="Search" className='w-96' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <AddUser />
            </div>


            {
                isLoading ? <div className="w-full flex   justify-center items-center">
                <div className=" loader "></div>
            </div>:
                    <Table className='border'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead >Gender</TableHead>
                                <TableHead >Action</TableHead>


                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.isArray(filteredUsers) ? (
                                filteredUsers.slice(startIndex, endIndex).map((x: UserSchemaRevi) => (
                                    <TableRow key={x._id}>
                                        <TableCell className="font-medium">
                                            <Avatar>
                                                <AvatarImage src={`https://i.pravatar.cc/300${x._id}`} alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{x.name}</TableCell>
                                        <TableCell>{x.email}</TableCell>
                                        <TableCell>{x.type}</TableCell>
                                        <TableCell>{x.gender}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline"><UserCog /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="">
                                                    <DropdownMenuLabel className="flex justify-center">User Action</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup className="">
                                                        <div className="flex w-full justify-center">
                                                            <UpdateUser name={x.name} email={x.email} type={x.type} gender={x.gender} idData={x._id} />
                                                        </div>
                                                        <DropdownMenuItem className="flex justify-center text-red-400">
                                                            <DeleteUser name={x.name} email={x.email} type={x.type} gender={x.gender} idData={x._id} />
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>No users found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    }

            {/* Renderizar tabla de usuarios aquí */}
            <Pagination className="mt-3">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className="cursor-pointer hover:text-green-500" onClick={handlePreviousPage} />
                    </PaginationItem>
                    {Array.from({ length: Math.min(totalPages) }).map((_, i) => {
                        const page = i + 1;
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    className="cursor-pointer hover:text-green-500"
                                    onClick={() => setInternalPage(page)}
                                    isActive={internalPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                    <PaginationItem>
                        <PaginationNext
                            className="cursor-pointer hover:text-green-500"
                            onClick={handleNextPage}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default TableUser
