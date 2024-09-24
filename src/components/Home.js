import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Home = () => {
    const context= useContext(noteContext);
    const {notes,setNotes}=context;
    return (
        <div>
            <h1>Add a Note </h1>
            <div className="container my-3">
                <form>
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="test" class="form-control" id="title" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="descripation" class="form-label">Descripation</label>
                        <input type="text" class="form-control" id="descripation" />
                    </div>

                    <div class="mb-3">
                        <label for="tag" class="form-label">Tag</label>
                        <input type="text" class="form-control" id="tag" />
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="container my-3">
                <h2>Your Notes</h2>
                {notes.map((note)=>{
                    return note.title;
                })}
            </div>
        </div>
    )
}

export default Home
