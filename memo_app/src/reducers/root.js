import { notesSlice } from "./notesStore";
import { textSlice } from "./searchTextStore";
import { darkSlice } from "./darkStore";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    text: textSlice.reducer,
    isDark: darkSlice.reducer,
  },
});

export default store;
