// pages/api/users.js

import { connectDB } from "@/utils/db.database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export async function GET(request: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const pageString = searchParams.get('page');
    const limitString = searchParams.get('limit');

    const page = pageString ? parseInt(pageString) : 1;
    const limit = limitString ? parseInt(limitString) : 5;

    try {
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalUsers = await User.countDocuments();

        return NextResponse.json({ users, totalUsers }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const newUser = new User(data);
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json(savedUser, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
    }
}
