const express = require('express');
const usersRouter = express.Router();
const { getUsers, getUserById, changeUserPassword } = require('../utils/controllers');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.put('/change-password', changeUserPassword);




module.exports = usersRouter;