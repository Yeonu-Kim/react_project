import { createSlice, nanoid } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notesStore",
  initialState: { value: [] },
  reducers: {
    addNote: (state, action) => {
      const date = new Date();
      const newNote = {
        id: nanoid(),
        text: action.payload,
        date: date.toLocaleDateString(),
      };
      state.value.push(newNote);
      updateNotes(state.value);
    },
    deleteNote: (state, action) => {
      const id = action.payload;
      console.log(state.value);
      state.value = state.value.filter((note) => note.id !== id);
      updateNotes(state.value);
    },
    fetchNotes: (state) => {
      const prev_notes = JSON.parse(localStorage.getItem("react-notes-data"));
      if (Object.keys(prev_notes).length !== 0) {
        state.value = prev_notes;
      }
    },
  },
});

const updateNotes = (notes) => {
  localStorage.setItem("react-notes-data", JSON.stringify(notes));
};

const { addNote, deleteNote, fetchNotes } = notesSlice.actions;

export { notesSlice, addNote, deleteNote, fetchNotes, updateNotes };
