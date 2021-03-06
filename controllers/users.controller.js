const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


dotenv.config({ path: './config.env' });

/*const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		include: [
			{ model: Post, include: { model: Comment, include: User } },
			{ model: Comment },
		],
	});

	res.status(200).json({
		status: 'success',
		users,
	});
});*/

const createUser = catchAsync(async (req, res, next) => {
	const { name, age, email, password } = req.body;

	// Hash password
	const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		age,
		email,
		password: hashPassword,
	});

	// Remove password from response
	newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});


const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name } = req.body;
	const { email } = req.body;


	await user.update({ name, email });

	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	// await user.destroy();
	await user.update({ status: 'Disable' });

	res.status(204).json({ status: 'success' });
});



const getUsersActive = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		where: {
			
			status: 'active',
		},
		include: [
			{ model: Post, include: { model: Comment, include: User } },
			{ model: Comment },
		],
	});

	res.status(200).json({
		status: 'success',
		users,
	});
});

module.exports = {
	getUsersActive,
	createUser,
	updateUser,
	deleteUser,
	login,
};
