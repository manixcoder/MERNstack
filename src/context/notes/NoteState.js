

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "66f1e5983a6f080c2f174ef4",
      "user": "66f1bcf961421ca44fcb9b54",
      "title": "My title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-09-23T22:03:04.731Z",
      "__v": 0
    },
    {
      "_id": "66f1e5ae3a6fdfg080c2f174ef6",
      "user": "66f1bcf961421ca44fcb9b54",
      "title": "My title2",
      "description": "Please wake up early2",
      "tag": "personal",
      "date": "2024-09-23T22:03:26.601Z",
      "__v": 0
    },
    {
      "_id": "66f1e5d200dce047ffga0a9ae9",
      "user": "66f1bcf961421ca44fcb9b54",
      "title": "My title2",
      "description": "Please wake up early2",
      "tag": "personal",
      "date": "2024-09-23T22:04:02.945Z",
      "__v": 0
    },
    {
      "_id": "66f1e5ef0514fdfg9b652a3ab4d",
      "user": "66f1bcf961421ca44fcb9b54",
      "title": "My title2",
      "description": "Please wake up early2",
      "tag": "personal",
      "date": "2024-09-23T22:04:31.885Z",
      "__v": 0
    },
    {
      "_id": "66f1e7b1f2709dfgf8129be5ac2c",
      "user": "66f1bcf961421ca44fcb9b54",
      "title": "My title23",
      "description": "Please wake up early23",
      "tag": "personal",
      "date": "2024-09-23T22:12:01.863Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial);
  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO : API call
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
  const deleteNote = () => {
    // eslint-disable-next-line

  }

  // Edit a Note
  const editNote = () => {
    // eslint-disable-next-line

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
