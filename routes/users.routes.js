const express = require('express');

// Controllers
const {
	getUsersActive,
	createUser,
	updateUser,
	deleteUser,
	login,
} = require('../controllers/users.controller');

// Middlewares
const {
	createUserValidators,
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.get('/', getUsersActive);

usersRouter.use(protectSession);

usersRouter
	.use('/:id', userExists)
	.route('/:id')
    .patch(protectUserAccount, updateUser)
	.delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
