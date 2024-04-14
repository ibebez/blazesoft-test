"use client";
import { useAppDispatch } from "@/lib/hooks";
import { editBook } from "@/lib/state/modal";
import type { Book } from "@/lib/state/book";
export default function BookName(props: { book: Book }) {
  const dispatch = useAppDispatch();

  return (
    <div
      style={{ cursor: "pointer", textDecoration: "underline" }}
      onClick={() => dispatch(editBook(props.book))}
    >
      {props.book.name}
    </div>
  );
}
