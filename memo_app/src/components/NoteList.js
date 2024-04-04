import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../reducers/notesStore";
import Note from "./Note";
import AddNote from "./AddNote";
import styles from "./NoteList.module.css";

const NoteList = () => {
  const notes = useSelector((state) => state.notes.value);
  const dispatch = useDispatch();

  const searchText = useSelector((state) => state.text.value);
  const visibleNotes = notes.filter((note) => {
    return note.text.toLowerCase().includes(searchText);
  });

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <div className={styles.note_list}>
      {visibleNotes.map((note, key) => {
        return (
          <Note key={key} id={note.id} text={note.text} date={note.date} />
        );
      })}
      <AddNote />
    </div>
  );
};

export default NoteList;
