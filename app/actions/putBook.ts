"use server";
import { randomUUID } from "crypto";
import type { Book } from "@/lib/state/book";
import { revalidateTag } from "next/cache";
import tryReadData from "./tryReadData";
import { promises as fs } from "fs";

export default async function putBook(prevState: any, formData: FormData) {
  const oid = formData.get("id") as string;
  const price = formData.get("price");
  const book: Book = {
    id: oid === "" ? randomUUID() : oid,
    name: formData.get("name") as string,
    price: price ? Number(formData.get("price") as string) : undefined,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
  };

  const booklist = await tryReadData();

  if (oid === "") {
    booklist.push(book);
  }

  await fs.writeFile(
    process.cwd() + "/app/booklist.json",
    JSON.stringify(booklist.map((b) => (b.id === book.id ? book : b)))
  );
  revalidateTag("booklist");
  return "ok" + randomUUID();
}
