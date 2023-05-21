const express = require('express');
const usersRouter = express.Router();
const { getUsers, changeUserPassword, getUserByUsername, deleteUser } = require('../controllers/user');

usersRouter.use((req, res, next) => {
    console.log('Users auth check middleware');
    console.log(req.user);
    if (req.user) next();
    else res.send(401);
});

usersRouter.get('/', getUsers);
usersRouter.get('/:username', getUserByUsername);
usersRouter.put('/change-password', changeUserPassword);
usersRouter.delete('/delete-user/:username', deleteUser);


module.exports = usersRouter;