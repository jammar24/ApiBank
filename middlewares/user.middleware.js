const Transfer = require('../models/transfer.model');
const User = require('../models/users.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchasync');

exports.handleLoginErrors = catchAsync(
  async (req, res, next) => {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        accountNumber: accountNumber,
      },
    });

    if (!user) {
      return next(
        new AppError(
          'Incorrect account number',
          404
        )
      );
    }

    if (user.status === 'disabled') {
      return next(
        new AppError('Account is disabled', 401)
      );
    }

    const validUser = await User.findOne({
      where: {
        accountNumber,
        password,
        status: 'active',
      },
    });

    if (!validUser) {
      return next(
        new AppError('Incorrect password', 401)
      );
    }

    req.validUser = validUser;
    next();
  }
);

exports.handleFindByIdErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'active',
      },
    });

    if (!user) {
      return next(
        new AppError('User not found', 404)
      );
    }

    const transferHistory =
      await Transfer.findAll({
        where: {
          senderUserId: id,
        },
      });

    if (
      !transferHistory ||
      transferHistory.length === 0
    ) {
      return next(
        new AppError(
          'User has no transfer history',
          404
        )
      );
    }

    req.user = user;
    req.transferHistory = transferHistory;

    next();
  }
);

exports.handleDeleteErrors = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      return next(
        new AppError('User not found', 404)
      );
    }

    if (user.status === 'disabled') {
      return next(
        new AppError('User already disabled', 400)
      );
    }

    req.user = user;

    next();
  }
);
