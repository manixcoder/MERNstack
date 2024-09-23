const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



// Route 1 
// Get All the Notes using: GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


// Route 2 
// Add a new Notes using: POST "/api/notes/create-notes". Login required

router.post('/create-notes', fetchuser,
    [
        body('title' ).isLength({min:3}),
        body('description').isLength({min:5}),
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



module.exports = router