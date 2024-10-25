"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function DELETE (request:Request) {
    const url = new URL(request.url);
    const libraryId = url.searchParams.get('id');

    if(!libraryId){
        return NextResponse.json({ error: 'Library ID is required' }, { status: 400 });
    }

    try{

        const getLibrary = await db.library.findUnique({
            where : { id:+libraryId}
        })

        if(getLibrary){
            const deleteResult = await db.result.deleteMany({
                where: {
                    library : getLibrary.title
                }
            })

            const response = await db.library.delete({
                where : {
                    id : +libraryId
                }
            })
        }
        
        return NextResponse.json({ status: 200 });

    }
    catch(error){
        console.error('Error delete library :', error);
        return NextResponse.json({ error: 'Failed to delete library ' }, { status: 500 });
     
    }
}