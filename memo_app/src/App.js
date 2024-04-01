import { useState } from "react";
import { nanoid } from 'nanoid';
import NoteList from './components/NoteList';
import stlyes from './App.module.css';

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

  return (
    <div className={stlyes.app}>
      Hello World!
      <NoteList notes={notes} handleSave={addNote} handleDelete={deleteNote}/>
    </div>
  );
}

export default App;
