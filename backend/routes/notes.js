const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



// Route 1 
// Get All the Notes using: GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


// Route 2 
// Add a new Notes using: POST "/api/notes/create-notes". Login required

router.post('/create-notes', fetchuser,
    [
        body('title').isLength({ min: 3 }),
        body('description').isLength({ min: 5 }),
    ],
    async (req, res) => {
        //console.log(req.body.description);
        const { title, description, tag } = req.body;

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body);
        try {
            const note = new Note({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                user: req.user.id
            })
            const saveNote = await note.save();

            res.status(201).json({ message: 'Notes created successfully', saveNote });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    })


// Route 3 
// Update an existing Notes using: POST "/api/notes/update-notes". Login required

router.put('/update-notes/:id', fetchuser, async (req, res) => {
    //console.log(req.body.description);
    const { title, description, tag } = req.body;

    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag }

    // Find the note to be update and update it

    let note = await Note.findById(req.params.id);
    if(!note){ 
        res.status(404).send("Not found");
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    const notes = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.status(201).json({ message: 'Notes updated created successfully', notes });

})

module.exports = router