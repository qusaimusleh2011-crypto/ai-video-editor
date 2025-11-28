import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName } = body;
    const jobId = randomUUID();
    const start = new Date().toISOString();
    // duration in seconds (simulate longer for larger files or premium)
    const duration = 12 + Math.floor(Math.random() * 20);
    return NextResponse.json({ jobId, start, duration });
  } catch (err) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
