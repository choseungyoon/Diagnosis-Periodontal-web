"use server";
import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(request: Request) {

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const library = (url.searchParams.get('library') || 'Default');
  
  console.log(url)
  console.log(library)
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  
  try {

    const results = await db.result.findMany({
        skip,
        take: pageSize,
        include: { protein: true },
        where : {
          library : library
        },
        orderBy : [
          {
            id : "desc"
          }
        ]
      });

      const totalResults = await db.result.count();


    if (!results) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }
    return NextResponse.json({ results, totalResults }, { status: 200 });  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}
