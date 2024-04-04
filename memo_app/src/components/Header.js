import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDark } from "../reducers/darkStore";
import style from "./Header.module.css";
import addNoteStyle from "./AddNote.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const handleToggleBtn = () => {
    dispatch(toggleDark());
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
