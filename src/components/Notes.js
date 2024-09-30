import React, { useContext, useEffect, useRef, setNote, useState } from 'react';
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';


function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
        //eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
    const updateNote = (currentNote) => {
        console.log("Hello Here");
        ref.current.click();
        setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    const handleClick =(e)=>{
        console.log("Updating the note....",note);
        e.preventDefault();
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Descripation</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.tag} onChange={onChange} />
                                    </div>

                                  
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
