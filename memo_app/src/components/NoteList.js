import Note from './Note';
import styles from "./NoteList.module.css";

const NoteList = () => {
    return(
        <div className={styles.note_list}>
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
        </div>
    );
}

export default NoteList;