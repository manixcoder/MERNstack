

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const notesInitial=[
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
          "_id": "66f1e5ae3a6f080c2f174ef6",
          "user": "66f1bcf961421ca44fcb9b54",
          "title": "My title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2024-09-23T22:03:26.601Z",
          "__v": 0
        },
        {
          "_id": "66f1e5d200dce047fa0a9ae9",
          "user": "66f1bcf961421ca44fcb9b54",
          "title": "My title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2024-09-23T22:04:02.945Z",
          "__v": 0
        },
        {
          "_id": "66f1e5ef0514f9b652a3ab4d",
          "user": "66f1bcf961421ca44fcb9b54",
          "title": "My title2",
          "description": "Please wake up early2",
          "tag": "personal",
          "date": "2024-09-23T22:04:31.885Z",
          "__v": 0
        },
        {
          "_id": "66f1e7b1f27098129be5ac2c",
          "user": "66f1bcf961421ca44fcb9b54",
          "title": "My title23",
          "description": "Please wake up early23",
          "tag": "personal",
          "date": "2024-09-23T22:12:01.863Z",
          "__v": 0
        }
      ]
      const [notes, setNotes]= useState(notesInitial);
    return (
        <NoteContext.Provider value={{ notes,notesInitial }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;
