import Note from './Note';
import AddNote from './AddNote';
import styles from "./NoteList.module.css";

const NoteList = ({ notes, handleSave }) => {
    return(
        <div className={styles.note_list}>
            {notes.map((note, key) => {
                return <Note key={key} id={ note.id } text={ note.text } date={ note.date }/>
            })}
            <AddNote handleSave={ handleSave }/>
        </div>
    );
}

export default NoteList;