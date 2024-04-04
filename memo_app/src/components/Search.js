import React from "react";
import { useDispatch } from "react-redux";
import { updateText } from "../reducers/searchTextStore";
import { MdSearch } from "react-icons/md";
import style from "./Search.module.css";

const Search = () => {
  const dispatch = useDispatch();
  const handleTextChange = (event) => {
    dispatch(updateText(event.target.value));
  };

  return (
    <div className={style.search}>
      <MdSearch className={style.search_icon} size="1.3em" />
      <input
        onChange={handleTextChange}
        className={style.search_input}
        type="text"
        placeholder="type to search..."
      />
    </div>
  );
};

export default Search;
