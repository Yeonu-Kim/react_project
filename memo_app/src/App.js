import NoteList from './components/NoteList';
import stlyes from './App.module.css';

const App = () => {
  return (
    <div className={stlyes.app}>
      Hello World!
      <NoteList />
    </div>
  );
}

export default App;
