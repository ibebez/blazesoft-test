import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Book } from "@/lib/state/book";
import tryReadData from "@/app/actions/tryReadData";

export async function GET(request: NextRequest) {
  const booklist = await tryReadData();

  return NextResponse.json(booklist);
}
