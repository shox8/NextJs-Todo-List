import { NextApiRequest, NextApiResponse } from "next";
import { json } from "../_libs";

export let notes: any[] = [];

export async function GET(_request: NextApiRequest) {
  return new Response(json(notes));
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  notes.push(req.body);
  return res.status(201).json(req.body);
}
