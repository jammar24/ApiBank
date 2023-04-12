const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

const catchAsync = require('../utils/catchasync');

exports.signup = catchAsync(
  async (req, res, next) => {
    const { name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name: name.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json({
      status: 'success',
      message:
        'The user has been created successfully!❤️',
      user,
    });
  }
);

exports.login = catchAsync(
  async (req, res, next) => {
    const { validUser } = req;

    res.status(201).json({
      status: 'success',
      message: `Login successfully 🤞`,
      user: validUser,
    });
  }
);

exports.findById = catchAsync(
  async (req, res) => {
    const { user, transferHistory } = req;

    res.status(200).json({
      message: 'Successful request',
      userTransfer: transferHistory,
      user,
    });
  }
);

exports.delete = catchAsync(async (req, res) => {
  const user = req.user;

  await user.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'User has been disabled',
  });
});
