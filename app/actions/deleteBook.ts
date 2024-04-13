"use server";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";
import tryReadData from "./tryReadData";

export default async function deleteBook(formData: FormData) {
  const id = formData.get("id") as string;

  const booklist = await tryReadData();

  await fs.writeFile(
    process.cwd() + "/app/booklist.json",
    JSON.stringify(booklist.filter((b) => b.id !== id))
  );

  revalidateTag("booklist");
  return "ok" + randomUUID();
}
