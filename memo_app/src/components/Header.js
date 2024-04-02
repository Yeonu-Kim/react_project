import React from "react";
import style from "./Header.module.css";
import addNoteStyle from "./AddNote.module.css";

const Header = ({ handleMode }) => {
  const handleToggleBtn = () => {
    handleMode((current) => !current);
  };
  return (
    <div className={style.header}>
      <h1>Notes</h1>
      <button onClick={handleToggleBtn} className={addNoteStyle.save}>
        Toggle Mode
      </button>
    </div>
  );
};

export default Header;
