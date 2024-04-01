import { MdDeleteForever } from 'react-icons/md';
import styles from "./Note.module.css";

const Note = () => {
    return (
        <div className={styles.note}>
            <span>Hi</span>
            <div className={styles.note_footer}>
                <small>010424</small>
                <MdDeleteForever className={styles.delete_icon} size="1.3em"/>
            </div>
        </div>
    )
}

export default Note;