const express = require('express');
const usersRouter = express.Router();
const { getUsers, getUserById, changeUserPassword } = require('../utils/controllers');

usersRouter.use((req, res, next) => {
    console.log('Users auth check middleware');
    console.log(req.user);
    if (req.user) next();
    else res.send(401);
});

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.put('/change-password', changeUserPassword);




module.exports = usersRouter;