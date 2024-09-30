

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    //API CAll
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmMWJjZjk2MTQyMWNhNDRmY2I5YjU0In0sImlhdCI6MTcyNzEyOTQ3NH0.agWnS3rNckaoXKxEfQohkP2hOj0f6EyBQdJqCkFygBE'
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);


  }
  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO : API call
    //API CAll
    const response = await fetch(`${host}/api/notes/create-notes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmMWJjZjk2MTQyMWNhNDRmY2I5YjU0In0sImlhdCI6MTcyNzEyOTQ3NH0.agWnS3rNckaoXKxEfQohkP2hOj0f6EyBQdJqCkFygBE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    console.log('Adding a new note');
    
    

  }
  // Delete a Note
  const deleteNote = async (id) => {
    console.log(id);
    //API CAll
    const response = await fetch(`${host}/api/notes/delete-notes/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmMWJjZjk2MTQyMWNhNDRmY2I5YjU0In0sImlhdCI6MTcyNzEyOTQ3NH0.agWnS3rNckaoXKxEfQohkP2hOj0f6EyBQdJqCkFygBE'
      }
    });
    const json = response.json();

    console.log("Deleting the note with id" + id);
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CAll
    const response = await fetch(`${host}/api/notes/update-notes/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmMWJjZjk2MTQyMWNhNDRmY2I5YjU0In0sImlhdCI6MTcyNzEyOTQ3NH0.agWnS3rNckaoXKxEfQohkP2hOj0f6EyBQdJqCkFygBE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    let newNotes =JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes.title = title;
        newNotes.description = description;
        newNotes.tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
