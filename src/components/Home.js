import React from 'react'
import Notes from './Notes'


const Home = () => {
   
    return (
        <div>
            <h1>Add a Note </h1>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="test" className="form-control" id="title" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripation" className="form-label">Descripation</label>
                        <input type="text" className="form-control" id="descripation" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Notes/>
        </div>
    )
}

export default Home
