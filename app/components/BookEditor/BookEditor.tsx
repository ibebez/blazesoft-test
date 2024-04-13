"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectModal, closeModal, updateContent } from "@/lib/state/modal";
import styles from "./BookEditor.module.css";
import putBook from "@/app/actions/putBook";
import { useFormState } from "react-dom";
import { useEffect } from "react";

export default function BookEditor() {
  const { visible, content } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const [returnValue, action] = useFormState(putBook, "n/a");

  useEffect(() => {
    if (returnValue.startsWith("ok")) {
      dispatch(closeModal());
    }
  }, [returnValue]);

  if (!visible) {
    return <div></div>;
  }

  return (
    <form action={action} className={styles.modalRoot}>
      <div
        className={styles.modalBackdrop}
        onClick={() => dispatch(closeModal())}
      ></div>
      <div className={styles.modalInner}>
        <div className={styles.modalTopRow}>
          <header className={styles.title}>
            {content!.id === "" ? "Add Book" : "Edit"}
          </header>
          <button
            onClick={() => dispatch(closeModal())}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>
        <input type="text" hidden name="id" value={content!.id} />
        <div className={styles.inputRow}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={content!.name}
            onChange={(e) =>
              dispatch(updateContent({ ...content!, name: e.target.value }))
            }
          />
        </div>
        <div className={styles.inputRow}>
          <label>Price</label>
          <input
            type="number"
            name="price"
            min="0"
            value={content!.price}
            onChange={(e) =>
              dispatch(
                updateContent({ ...content!, price: Number(e.target.value) })
              )
            }
          />
        </div>
        <div className={styles.inputRow}>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={content!.category}
            onChange={(e) =>
              dispatch(updateContent({ ...content!, category: e.target.value }))
            }
          />
        </div>
        <div className={styles.descriptionContainer}>
          <label>Description</label>
          <textarea
            name="description"
            value={content!.description}
            rows={5}
            onChange={(e) =>
              dispatch(
                updateContent({ ...content!, description: e.target.value })
              )
            }
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
