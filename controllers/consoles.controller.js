


// Models
const { Console } = require('../models/consoles.model');


// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');




const getAllConsole = catchAsync(async (req, res, next) => {
	const users = await Console.findAll({
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

const createConsole = catchAsync(async (req, res, next) => {
	const { name, company  } = req.body;

	const console = await User.create({
		name,
		company,
		
	});

	res.status(201).json({
		status: 'success',
		console,
	});
});


const updateConsole = catchAsync(async (req, res, next) => {
	const { console } = req;
	const { name } = req.body;
	


	await console.update({ name,  });

	res.status(204).json({ status: 'success' });
});

const deleteConsole = catchAsync(async (req, res, next) => {
	const { console } = req;

	// await user.destroy();
	await console.update({ status: 'Disable' });

	res.status(204).json({ status: 'success' });
});


module.exports = {
	getAllConsole,
    createConsole,
    updateConsole,
    deleteConsole,
};
