"use client";
import { addNewBook } from "@/lib/state/modal";
import { useAppDispatch } from "@/lib/hooks";
import styles from "./AddBookButton.module.css";

export default function AddBookButton() {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(addNewBook());
  };
  return (
    <button onClick={onClick} className={styles.addBookButton}>
      Add Book
    </button>
  );
}
