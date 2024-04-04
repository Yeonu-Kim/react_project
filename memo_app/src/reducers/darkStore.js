import { createSlice, nanoid } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "darkStore",
  initialState: { value: false },
  reducers: {
    toggleDark: (state) => {
      state.value = !state.value;
    },
  },
});

const { toggleDark } = darkSlice.actions;

export { darkSlice, toggleDark };
