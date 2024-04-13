"use server";
import { randomUUID } from "crypto";
import type { Book } from "@/lib/state/book";
import { revalidatePath } from "next/cache";
import tryReadData from "./tryReadData";
import { promises as fs } from "fs";
import { tmpdir } from "os";

export default async function putBook(prevState: any, formData: FormData) {
  const oid = formData.get("id") as string;
  const price = formData.get("price");
  const path = tmpdir + "/booklist.json";

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
    path,
    JSON.stringify(booklist.map((b) => (b.id === book.id ? book : b)))
  );

  revalidatePath("/");
  return "ok" + randomUUID();
}
