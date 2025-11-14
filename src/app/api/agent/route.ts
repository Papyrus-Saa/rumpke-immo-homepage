import { NextRequest, NextResponse } from 'next/server';


let agents: any[] = [];

export async function GET(req: NextRequest) {

  return NextResponse.json(agents);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newAgent = { ...data, id: crypto.randomUUID() };
  agents.push(newAgent);
  return NextResponse.json(newAgent, { status: 201 });
}
