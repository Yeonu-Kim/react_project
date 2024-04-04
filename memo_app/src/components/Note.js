import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteNote } from "../reducers/notesStore";
import styles from "./Note.module.css";

const Note = ({ id, text, date }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (event) => {
    event.preventDefault();
    dispatch(deleteNote(id));
  };

  return (
    <div className={styles.note}>
      <span>{text}</span>
      <div className={styles.note_footer}>
        <small>{date}</small>
        <MdDeleteForever
          onClick={handleDeleteClick}
          className={styles.delete_icon}
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
