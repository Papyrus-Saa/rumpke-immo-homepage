import { NextRequest, NextResponse } from 'next/server';


let agents: any[] = [];

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const agent = agents.find(a => a.id === params.id);
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = agents.findIndex(a => a.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const data = await req.json();
  agents[idx] = { ...agents[idx], ...data };
  return NextResponse.json(agents[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = agents.findIndex(a => a.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = agents.splice(idx, 1)[0];
  return NextResponse.json(deleted);
}
