import React from 'react'
import Notes from './Notes'


const Home = () => {
   
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
            <Notes/>
        </div>
    )
}

export default Home
