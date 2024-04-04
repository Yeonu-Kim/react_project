import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../reducers/notesStore";
import style from "./AddNote.module.css";
import noteStyle from "./Note.module.css";

const AddNote = () => {
  const [noteText, setNoteText] = useState("");
  const maximum_char = 200;
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.value);

  const handleChange = (event) => {
    const content = event.target.value;

    if (content.length <= maximum_char) {
      setNoteText(content);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      dispatch(addNote(noteText));
      setNoteText("");
    }
  };

  return (
    <div className={`${noteStyle.note} ${style.new_note}`}>
      <textarea
        onChange={handleChange}
        value={noteText}
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
      />
      <div className={noteStyle.note_footer}>
        <small>{maximum_char - noteText.length} Remaining</small>
        <button className={style.save} onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
