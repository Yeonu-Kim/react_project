import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./index.css";
import NoteList from "./components/NoteList";
import stlyes from "./App.module.css";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [isDark, setIsDark] = useState(false);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const visibleNotes = notes.filter((note) => {
    return note.text.toLowerCase().includes(searchText);
  });

  useEffect(() => {
    const prev_notes = JSON.parse(localStorage.getItem("react-notes-data"));
    console.log(prev_notes);
    if (prev_notes) {
      setNotes(prev_notes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-data", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={`${stlyes.app} ${isDark && stlyes.dark_mode}`}>
      <Header handleMode={setIsDark} />
      <Search handleSearchNote={setSearchText} />
      <NoteList
        notes={visibleNotes}
        handleSave={addNote}
        handleDelete={deleteNote}
      />
    </div>
  );
};

export default App;
