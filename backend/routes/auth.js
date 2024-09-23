const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult } =require('express-validator');


// Create a User Using:POST "/api/auth". Doesn't require Auth
router.post('/',[
    body('name','Please enter a valide name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
],(req,res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
        .catch(err=> {console.log(err)
            res.json({error:'Please enter a valid data',message:err.message})});
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
});




module.exports = router