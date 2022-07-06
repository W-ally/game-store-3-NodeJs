const express = require('express');

// Controllers
const {
	getAllConsole,
    createConsole,
    updateConsole,
    deleteConsole,
} = require('../controllers/consoles.controller');

// Middlewares
const {
	createConsoleValidators
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const consoleRouter = express.Router();


consoleRouter.get('/', getAllConsole);

consoleRouter.use(protectSession);

consoleRouter.post('/', createConsoleValidators, createConsole);

consoleRouter
	.use('/:id', userExists)
	.route('/:id')
    .patch(protectUserAccount, updateConsole)
	.delete(protectUserAccount, deleteConsole);

module.exports = { consoleRouter };
