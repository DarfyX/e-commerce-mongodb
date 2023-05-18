const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const { registerUser } = require('../utils/controllers');



authRouter.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged In');
    res.sendStatus(200);
})

authRouter.post('/register', registerUser)  

module.exports = authRouter;