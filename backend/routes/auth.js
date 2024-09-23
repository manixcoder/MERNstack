const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET="Manishisagooddevlop$r"


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

        const salt = await bcrypt.genSalt(10);
       const secPass = await bcrypt.hash(req.body.password,salt)
        // Create a new user
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data ={
            user:{
                id:user.id
            }
        }

        const authtoken= jwt.sign(data,JWT_SECRET);
        console.log(authtoken);

        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: 'Please enter a valid data', message: err.message })
        // });
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);


        res.status(201).json({ message: 'User created successfully', authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
});




module.exports = router