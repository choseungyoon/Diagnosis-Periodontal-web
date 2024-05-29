"use server"
import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
const db = new PrismaClient();


export async function POST(request: Request) {
    const body = await request.json();
    const { userName, predictedResult, proteins } = body;
  
    console.log('Received data:', { userName, predictedResult, proteins });
  
    try {
      const result = await db.result.create({
        data: {
          userName,
          predictedResult,
          protein: {
            create: proteins.map((protein: any) => ({
                protein: protein.protein,
                importance: protein.importance,
                abundance: protein.abundance,
            })),
          },
        },
      });
  
      console.log('Result saved:', result);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error('Error saving result:', error);
      return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
    }
  }
