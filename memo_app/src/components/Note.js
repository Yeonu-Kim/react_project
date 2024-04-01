import { MdDeleteForever } from 'react-icons/md';
import styles from "./Note.module.css";

const Note = ({ id, text, date }) => {
    return (
        <div className={styles.note}>
            <span>{ text }</span>
            <div className={styles.note_footer}>
                <small>{ date }</small>
                <MdDeleteForever className={styles.delete_icon} size="1.3em"/>
            </div>
        </div>
    )
}

export default Note;