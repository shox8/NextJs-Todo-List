import { json } from "@/app/_libs";
import { notes } from "../route";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  notes.map((item, index) => {
    if (item.id === params.id) {
      notes.splice(index, 1, data);
    }
  });
  return new Response(json(data));
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  notes.map((item, index) => {
    if (item.id === params.id) {
      notes.splice(index, 1);
    }
  });
  return new Response(json(params.id));
}
