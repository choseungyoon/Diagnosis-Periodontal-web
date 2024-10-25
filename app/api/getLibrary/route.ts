"use server";
import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { id } from 'date-fns/locale';
const db = new PrismaClient();

export async function GET(){
    console.log("GET LIBRARY")
    try{
        const libraries = await db.library.findMany({
            select : {
                id: true,
                title : true
            }
        })
        return NextResponse.json({libraries},{status:200})
    }
    catch(error){
        console.error('Error fetching library:', error);
        return NextResponse.json(["Default"],{status:400})
    }
}