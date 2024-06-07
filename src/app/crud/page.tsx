'use server'
import TableUser from '@/components/global/table-user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table } from '@/components/ui/table'
import React from 'react'
import AddUser from './components/adduser'
import Link from 'next/link'
import SwhichTheme from '@/components/global/swhitch-theme'

const page = () => {
    return (

        <Card className='p-10 m-16 border '>
            <CardTitle className='font-bold text-4xl flex w-full justify-between'>
                CRUD APP
                <div className='flex gap-4'>
                    <SwhichTheme />
                    <Button className='rounded-full text-2xl font-bold' > <Link href={'/'}> Exit </Link> </Button>

                </div>
            </CardTitle>
            <CardContent >


                <TableUser />
            </CardContent>

        </Card>
    )
}

export default page