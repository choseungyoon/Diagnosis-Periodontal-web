"use server";
import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

export async function GET(request: Request){
    const url = new URL(request.url);
    console.log("GET LIBRARY")
    try{
        const libraries = await db.library.findMany({
            select : {
                id: true,
                title : true
            }
        })
        console.log(libraries)
        return NextResponse.json({libraries},{status:200});
    }
    catch(error){
        console.error('Error fetching library:', error);
        return NextResponse.json(["Default"],{status:400})
    }
}