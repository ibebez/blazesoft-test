import styles from "./Booklist.module.css";
import { promises as fs } from "fs";
import type { Book } from "@/lib/state/book";
import BookEditor from "../BookEditor/BookEditor";
import AddBookButton from "../AddBookButton/AddBookButton";
import BookName from "../BookName";
import DeleteButton from "../DeleteButton";
import tryReadData from "@/app/actions/tryReadData";
export const Booklist = async () => {
  const booklist = await tryReadData();

  return (
    <div className={styles.container}>
      <AddBookButton />
      <table className={styles.booklist}>
        <thead>
          <tr>
            <td>Book Name</td>
            <td className={styles.category}>Category</td>
            <td className={styles.price}>Price</td>
            <td className={styles.deleteButton}>Action</td>
          </tr>
        </thead>
        <tbody>
          {booklist.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.noEntry}>
                No Entry
              </td>
            </tr>
          ) : (
            booklist.map((book) => (
              <tr key={book.id} className={styles.bookRow}>
                <td>
                  <BookName book={book} />
                  <span className={styles.hiddenBookName}>{book.name}</span>
                </td>
                <td>
                  <span className={styles.category}>{book.category}</span>
                </td>
                <td className={styles.price}>
                  ${Number(book.price).toLocaleString("en")}
                </td>
                <td className={styles.deleteButton}>
                  <DeleteButton id={book.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <BookEditor />
    </div>
  );
};
