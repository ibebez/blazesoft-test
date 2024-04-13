"use server";
import { promises as fs } from "fs";
import type { Book } from "@/lib/state/book";

export default async function tryReadData() {
  const path = process.cwd() + "/app/booklist.json";
  try {
    const file = await fs.readFile(path, "utf8");
    const booklist = JSON.parse(file) as any as Book[];
    return booklist;
  } catch (error) {
    await fs.writeFile("path", JSON.stringify([]));
    return [];
  }
}
