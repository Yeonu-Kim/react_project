import { useState } from "react";
import style from './AddNote.module.css';
import noteStyle from './Note.module.css'

const AddNote = ({ handleSave }) => {
    const [noteText, setNoteText] = useState("");

    const handleChange = (event) => {
        setNoteText(event.target.value);
    }

    const handleSaveClick = () => {
        handleSave(noteText);
        setNoteText("");
    }

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
                <small>200 Remaining</small>
                <button className={style.save} onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
}

export default AddNote;