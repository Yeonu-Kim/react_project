import { useState } from "react";
import style from "./AddNote.module.css";
import noteStyle from "./Note.module.css";

const AddNote = ({ handleSave }) => {
  const [noteText, setNoteText] = useState("");
  const [count, setCount] = useState(200);

  const handleChange = (event) => {
    const content = event.target.value;

    if (content.length <= 200) {
      setNoteText(content);
      setCount(200 - content.length);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleSave(noteText);
      setNoteText("");
    }
  };

  return (
    <div className={`${noteStyle.note} ${style.new_note} `}>
      <textarea
        onChange={handleChange}
        value={noteText}
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
      />
      <div className={noteStyle.note_footer}>
        <small>{count} Remaining</small>
        <button className={style.save} onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
