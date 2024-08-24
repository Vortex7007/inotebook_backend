const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// create a user using : post "/api/auth/" . doesn't require auth
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with the email exists or not
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exists" });
        }
        const secPass = await bcrypt.hash(req.body.password , 10)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        //setting jwt token 
        const data = {
            user:{
                id: user.id
            }
        }
        console.log(process.env.JWT_KEY)
        const authToken = jwt.sign(data, process.env.JWT_KEY);
        console.log(authToken);
        res.json(authToken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


module.exports = router;