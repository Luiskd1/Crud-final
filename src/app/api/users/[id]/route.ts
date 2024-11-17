import { connectDB } from "@/utils/db.database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

interface RequestParams {
    id: string;
}

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: NextRequest, { params }: { params: RequestParams }) {
    try {
        await connectDB();
        const userFound = await User.findOne({ _id: params.id });
        if (!userFound) return NextResponse.json({ message: "User not found" }, { status: 404, headers: corsHeaders });
        return NextResponse.json(userFound, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json(String(error), { status: 400, headers: corsHeaders });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: RequestParams }) {
    try {
        await connectDB();
        const userDeleted = await User.findByIdAndDelete(params.id);
        if (!userDeleted) return NextResponse.json({ message: "User not found" }, { status: 404, headers: corsHeaders });
        return NextResponse.json(userDeleted, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json(String(error), { status: 400, headers: corsHeaders });
    }
}

export async function PUT(request: NextRequest, { params }: { params: RequestParams }) {
    try {
        const data = await request.json();
        await connectDB();
        const userUpdate = await User.findByIdAndUpdate(params.id, data, { new: true });
        return NextResponse.json(userUpdate, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json(String(error), { status: 400, headers: corsHeaders });
    }
}
