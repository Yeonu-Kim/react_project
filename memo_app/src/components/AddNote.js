import style from './AddNote.module.css';
import noteStyle from './Note.module.css'

const AddNote = () => {
    return (
        <div className={`${noteStyle.note} ${style.new_note}`}>
            <textarea rows="8" cols="10" placeholder="Type to add a note..." />
            <div className={noteStyle.note_footer}>
                <small>200 Remaining</small>
                <button className={style.save}>Save</button>
            </div>
        </div>
    );
}

export default AddNote;