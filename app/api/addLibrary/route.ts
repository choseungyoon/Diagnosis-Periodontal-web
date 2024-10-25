"use server"
import { PrismaClient } from "@prisma/client";
import { ca } from "date-fns/locale";
import { NextResponse } from 'next/server';
const db = new PrismaClient();

export async function POST (request:Request) {
    const body = await request.json();
    const { title } = body;

    try{
        const newLibrary = await db.library.create({
            data : {
                title
            }
        })

        console.log('Result saved:', newLibrary);
        return NextResponse.json({newLibrary},{ status: 200 });
    }
    catch(error) {
        console.error('Error saving result:', error);
        return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });

    }
}