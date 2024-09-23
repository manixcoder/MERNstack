const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Create a User Using:POST "/api/auth/sign-up". Doesn't require Auth
router.post('/sign-up', [
    body('name', 'Please enter a valide name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body);
    // check whether the user exists aleady
    try {


        let userdata = await User.findOne({ email: req.body.email });
        if (userdata) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }

        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: 'Please enter a valid data', message: err.message })
        // });
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
});




module.exports = router