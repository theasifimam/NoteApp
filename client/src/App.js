import { useState, useEffect } from "react";
import "./App.css";
import AddNote from "./components/AddNote/AddNote";
import NavBar from "./components/NavBar/NavBar";
import ShowNote from "./components/ShowNote/ShowNote";
import axios from "axios";

function App() {
  const [note, setNote] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getAll")
      .then((res) => setNote(res.data));
  }, []);
  return (
    <>
      <NavBar />
      <AddNote note={note} setNote={setNote} />
      <ShowNote note={note} setNote={setNote} />
    </>
  );
}

export default App;
