import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "searchTextStore",
  initialState: { value: "" },
  reducers: {
    updateText: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { updateText } = textSlice.actions;

export { textSlice, updateText };
