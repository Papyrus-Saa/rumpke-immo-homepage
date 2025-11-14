
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  return NextResponse.json({ message: 'GET all agents - implementa la lógica real aquí' });
}

export async function POST(req: NextRequest) {

  return NextResponse.json({ message: 'POST create agent - implementa la lógica real aquí' });
}
