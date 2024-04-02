import { useState } from "react";
import { nanoid } from 'nanoid';
import './index.css';
import NoteList from './components/NoteList';
import stlyes from './App.module.css';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
    id: nanoid(),
    text: "This is my first note!",
    date: "01/04/24"
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "02/04/24"
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "03/04/24"
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [isDark, setIsDark] = useState(false);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }

    setNotes([...notes, newNote]);
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const visibleNotes = notes.filter((note) => {
    return note.text.toLowerCase().includes(searchText);
  })

  return (
      <div className={`${stlyes.app} ${isDark && stlyes.dark_mode}`}>
        <Header handleMode={setIsDark}/>
        <Search handleSearchNote={setSearchText}/>
        <NoteList notes={visibleNotes} handleSave={addNote} handleDelete={deleteNote}/>
      </div>
  );
}

export default App;
