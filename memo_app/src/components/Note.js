import { MdDeleteForever } from "react-icons/md";
import styles from "./Note.module.css";

const Note = ({ id, text, date, handleDelete }) => {
  const handleDeleteClick = (event) => {
    event.preventDefault();
    handleDelete(id);
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
