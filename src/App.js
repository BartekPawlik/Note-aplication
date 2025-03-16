import React, { useState, useEffect } from "react";

const initialNotes = [
  {
    id: 1,
    title: "pierwszy",
    text: "Pierwsza notatka",
  },
  {
    id: 2,
    title: "drugi",
    text: "Druga notatka",
  },
  {
    id: 3,
    title: "trzeci",
    text: "Trzecia notatka",
  },
];

export default function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState();

  function handleNotes(note) {
    setNotes((prev) => [...prev, note]);
  }

  function handleSelectNote(note) {
    setSelectedNote(note);
    console.log(note);
  }
  return (
    <div className="app">
      <div className="update-text">
        <UpdateTextNote
          selectedNote={selectedNote}
          setselectednote={setSelectedNote}
          setNotes={setNotes}
        />
      </div>
      <div className="set-container">
        <ListNotes notes={notes} handleSelectNote={handleSelectNote} />
        <NotesPanel handleNotes={handleNotes} />
      </div>
    </div>
  );
}
function ListNotes({ notes, handleSelectNote }) {
  return (
    <div className="notes-list">
      {notes.map((note, index) => (
        <div key={index} className="note">
          <Note handleSelectNote={handleSelectNote} note={note} />
        </div>
      ))}
    </div>
  );
}

function Note({ note, handleSelectNote }) {
  return (
    <div onClick={() => handleSelectNote(note)}>
      <p>{note.title}</p>
    </div>
  );
}

function NotesPanel({ handleNotes }) {
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  function addNote() {
    const newNote = {
      id: Date.now(),
      title: newTitle,
      text: newText,
    };
    handleNotes(newNote);
    setNewText("");
    setNewTitle("");
  }

  return (
    <div className="panel-notes">
      <label>Tytuł notatki</label>
      <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <label>Treść notatki</label>
      <textarea value={newText} onChange={(e) => setNewText(e.target.value)} />
      <button onClick={addNote}>Dodaj notatke</button>
    </div>
  );
}

function UpdateTextNote({ selectedNote, setselectednote, setNotes }) {
  if (!selectedNote) return null;


function handleTitleChange(newTitle){
const updatenote = {
  ...selectedNote,
  title: newTitle,
}
setselectednote(updatenote)

setNotes((prev) =>
prev.map((title) =>
title.id === selectedNote.id ? updatenote : title))
}


  function handleTextChange(newText) {
    const updatenote = {
      ...selectedNote,
      // title:
      text: newText,
    };
    setselectednote(updatenote);

    setNotes((prev) =>
      prev.map((note) => (note.id === selectedNote.id ? updatenote : note))
    );
  }

  return (
    <div className="update-note">
      <input value={selectedNote.title} onChange={(e) => handleTitleChange(e.target.value)} />
      <textarea
        value={selectedNote.text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
    </div>
  );
}
