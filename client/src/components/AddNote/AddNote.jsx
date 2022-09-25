import React, { useState } from "react";
import "./AddNote.css";
import axios from "axios";

const AddNote = ({ setNote }) => {
  const [noteObj, setNoteObj] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteObj({
      ...noteObj,
      [name]: value,
    });
    console.log(noteObj);
  };

  const add = () => {
    if (noteObj.title) {
      axios
        .post("http://localhost:3001/api/add", noteObj)
        .then((res) => setNote(res.data));
    }

    setNoteObj({
      title: "",
      description: "",
    });
  };
  return (
    <div className="AddNote">
      <input
        type="text"
        id="text"
        name="title"
        placeholder="Enter Note Title"
        onChange={handleChange}
        value={noteObj.title}
      />
      <textarea
        name="description"
        cols="30"
        rows="3"
        placeholder="Enter your note"
        onChange={handleChange}
        value={noteObj.description}
      ></textarea>
      <button onClick={add}>Add Note</button>
    </div>
  );
};

export default AddNote;
