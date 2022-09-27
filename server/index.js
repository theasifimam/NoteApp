import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/Note",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected");
  }
);

const NoteSchema = mongoose.Schema({
  title: String,
  description: String,
});

NoteSchema.set("timestamps", true);

const Note = new mongoose.model("Note", NoteSchema);

app.get("/api/getAll", (req, res) => {
  Note.find({}, (err, NoteList) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(NoteList);
    }
  }).sort({ createdAt: -1 });
});

app.post("/api/add", (req, res) => {
  const { title, description } = req.body;
  const noteObj = new Note({
    title: title,
    description: description,
  });

  noteObj.save((err) => {
    if (err) {
      console.log(err);
    }

    Note.find({}, (err, NoteList) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(NoteList);
      }
    }).sort({ createdAt: -1 });
  });
});

app.post("/api/delete", (req, res) => {
  // const id = req.body.id
  const { id } = req.body;
  Note.deleteOne({ _id: id }, () => {
    Note.find({}, (err, NoteList) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(NoteList);
    }).sort({ createdAt: -1 });
  });
});

app.listen(3001, () => {
  console.log("Backend Created at port 3001");
});
