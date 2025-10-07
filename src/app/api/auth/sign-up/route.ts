import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // NOTE: This is a demo endpoint; no real DB write is performed.
  // In a real app, you'd hash passwords, store user, and return a session/JWT.
  const user = {
    id: crypto.randomUUID(),
    email: body.email,
    name: body.name ?? "",
  };
  // pretend to save, then respond
  return NextResponse.json({ user }, { status: 200 });
}
