"use server";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";
import { tmpdir } from "os";
import tryReadData from "./tryReadData";

export default async function deleteBook(formData: FormData) {
  const path = tmpdir + "/booklist.json";
  const id = formData.get("id") as string;

  const booklist = await tryReadData();

  await fs.writeFile(path, JSON.stringify(booklist.filter((b) => b.id !== id)));

  revalidateTag("booklist");
  return "ok" + randomUUID();
}
