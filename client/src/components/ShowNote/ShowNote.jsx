import React from "react";
import "./ShowNote.css";
import axios from "axios";

const ShowNote = ({ note, setNote }) => {
  const deleteNote = (id) => {
    axios
      .post("http://localhost:3001/api/delete", { id })
      .then((res) => setNote(res.data));
  };
  return (
    <div className="ShowNotes">
      {note.map((note) => (
        <div className="ShowNote" key={note._id}>
          <div className="delete">
            <input type="text" value={note.title} maxLength="20" readOnly />
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteNote(note._id)}
            ></i>
          </div>
          <textarea
            name="description"
            value={note.description}
            readOnly
          ></textarea>
        </div>
      ))}
    </div>
  );
};

export default ShowNote;
