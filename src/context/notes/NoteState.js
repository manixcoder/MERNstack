

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host="http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    //API CAll
        const response= await fetch(`${host}/api/notes/fetchallnotes`,{
          method:"GET",
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmMWJjZjk2MTQyMWNhNDRmY2I5YjU0In0sImlhdCI6MTcyNzEyOTQ3NH0.agWnS3rNckaoXKxEfQohkP2hOj0f6EyBQdJqCkFygBE'
          }
        });
        const json= await response.json();
        console.log(json);
        setNotes(json);
      
       
      }
  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO : API call
    //API CAll
    const response= await fetch(`${host}/api/notes/create-notes`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmMWJjZjk2MTQyMWNhNDRmY2I5YjU0In0sImlhdCI6MTcyNzEyOTQ3NH0.agWnS3rNckaoXKxEfQohkP2hOj0f6EyBQdJqCkFygBE'
      },
      body:JSON.stringify({title,description,tag})
    });
    const json= response.json();
    console.log('Adding a new note');
    const note = {
      "_id": "66f1e7b1f2709dfgf8129be5ac2c",
      "user": "66f1bcf961421ca44fcb9b54",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-09-23T22:12:01.863Z",
      "__v": 0
    };
    // eslint-disable-next-line
    setNotes(notes.concat(note))

  }
  // Delete a Note
  const deleteNote = async (id) => {
    // TODO : API call
    console.log("Deleting the note with id" + id);
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  // Edit a Note
  const editNote = async (id,title,description,tag) => {
//API CAll
    const response= await fetch(`${host}/api/notes/update-notes/${id}`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmMWJjZjk2MTQyMWNhNDRmY2I5YjU0In0sImlhdCI6MTcyNzEyOTQ3NH0.agWnS3rNckaoXKxEfQohkP2hOj0f6EyBQdJqCkFygBE'
      },
      body:JSON.stringify({title,description,tag})
    });
    const json= response.json();
  
    // TODO : API call
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        element.title=title;
        element.description=description;
        element.tag=tag;
      }
      
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
