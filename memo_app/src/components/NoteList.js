import Note from './Note';
import styles from "./NoteList.module.css";

const NoteList = ({ notes }) => {
    return(
        <div className={styles.note_list}>
            {notes.map((note, key) => {
                return <Note key={key} id={ note.id } text={ note.text } date={ note.date }/>
            })}
        </div>
    );
}

export default NoteList;