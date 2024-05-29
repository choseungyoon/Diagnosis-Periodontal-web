"use server";
import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const resultId = url.searchParams.get('resultId');

  if (!resultId) {
    return NextResponse.json({ error: 'Result ID is required' }, { status: 400 });
  }

  try {
    const result = await db.result.findUnique({
      where: { id: parseInt(resultId) },
      include: { protein: true },
    });

    if (!result) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}
