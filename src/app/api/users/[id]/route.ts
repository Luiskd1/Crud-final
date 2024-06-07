import { connectDB } from "@/utils/db.database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";


interface RequestParams {
    id: string;
}

export async function GET(request:NextRequest, {params}:{ params: RequestParams }) {
    try {
        connectDB()
        const userFound = await User.findOne({
            _id: params.id
        })
        if (!userFound) return NextResponse.json({
            message: "Task not found",
        }, { status: 404 })
        return NextResponse.json(userFound);
    }
    catch (error) {
        return NextResponse.json(String(error), { status: 400 });

    }
}
export async function DELETE(request:NextRequest, { params }:{ params: RequestParams }) {
    try {
        const userDeleted = await User.findByIdAndDelete(params.id)

        if (!userDeleted) {
            return NextResponse.json({
                message: "User not found",
            }, {
                status: 404
            })
        }
        return NextResponse.json(userDeleted);
    } catch (error) {
        return NextResponse.json(String(error), { status: 400 });

    }
}

export async function PUT(request:NextRequest, { params }:{ params: RequestParams }) {
    try {
        const data = await request.json()
        const userUpdate = await User.findByIdAndUpdate(params.id, data, {
            new: true
        })
        return NextResponse.json(userUpdate);
    } catch (error) {
        return NextResponse.json(String(error), { status: 400 });

    }
}