import { NextRequest } from "next/server";
import { json } from "../_libs";

export let notes: any[] = [];

export async function GET(_request: NextRequest) {
  return new Response(json(notes));
}

export async function POST(request: Request) {
  const data = await request.json();
  notes.push(data);
  return new Response(json(data));
}
