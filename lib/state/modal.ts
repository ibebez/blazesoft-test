import { createAppSlice } from "@/lib/createAppSlice";
import type { Book } from "./book";
import { PayloadAction } from "@reduxjs/toolkit";

export type ModalSliceState = {
  visible: boolean;
  content?: Book;
};

const initialState: ModalSliceState = {
  visible: false,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const modalSlice = createAppSlice({
  name: "modal",
  initialState,
  reducers: (create) => ({
    addNewBook: create.reducer((state) => {
      state.visible = true;
      state.content = {
        id: "",
        name: "",
        category: "",
        description: "",
      };
    }),
    editBook: create.reducer((state, action: PayloadAction<Book>) => {
      state.visible = true;
      state.content = action.payload;
    }),
    updateContent: create.reducer((state, action: PayloadAction<Book>) => {
      state.content = action.payload;
    }),
    closeModal: create.reducer((state) => {
      state.visible = false;
      state.content = undefined;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectModal: (modal) => modal,
  },
});

export const { addNewBook, editBook, closeModal, updateContent } =
  modalSlice.actions;

export const { selectModal } = modalSlice.selectors;
