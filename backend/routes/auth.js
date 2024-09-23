const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Manishisagooddevlop$r"

// Route 1
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
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Create a new user
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);

        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: 'Please enter a valid data', message: err.message })
        // });
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);


        res.status(201).json({ message: 'User created successfully', authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
});


// Route 2
//Authentication a User using: POST "/api/auth/login". No login required

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);

        res.status(201).json({ message: 'login successfully', authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }


});

// Route 3

// Get loggedin User Details using: POST "api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId);
        res.status(201).json({ message: 'User created successfully', user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");;

    }
})

module.exports = router