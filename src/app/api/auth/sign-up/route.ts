import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const user = {
    id: crypto.randomUUID(),
    email: String(body.email ?? ""),
    name: String(body.name ?? ""),
  };
  return NextResponse.json({ user }, { status: 200 });
}
