import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import NoteList from "./components/NoteList";
import stlyes from "./App.module.css";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const isDark = useSelector((state) => state.isDark.value);

  return (
    <div className={`${stlyes.app} ${isDark && stlyes.dark_mode}`}>
      <Header />
      <Search />
      <NoteList />
    </div>
  );
};

export default App;
