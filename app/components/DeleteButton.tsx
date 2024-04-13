"use client";
import { useAppDispatch } from "@/lib/hooks";
import type { Book } from "@/lib/state/book";
import deleteBook from "../actions/deleteBook";

export default function DeleteButton(props: { id: string }) {
  return (
    <form action={deleteBook}>
      <input type="text" name="id" value={props.id} hidden readOnly />
      <button type="submit">Delete</button>
    </form>
  );
}
