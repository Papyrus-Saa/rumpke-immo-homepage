import { NextRequest, NextResponse } from 'next/server';

// In-memory array for demo purposes. Replace with DB logic in production.
let properties: any[] = [];

export async function GET(req: NextRequest) {
  return NextResponse.json(properties);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Add a unique id (in production, use DB-generated id)
    const newProperty = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    properties.push(newProperty);
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid property data' }, { status: 400 });
  }
}
