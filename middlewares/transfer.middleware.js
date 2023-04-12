const User = require('../models/users.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchasync');

exports.handleTransferErrors = catchAsync(
  async (req, res, next) => {
    const {
      amount,
      senderAccount,
      receiverAccount,
    } = req.body;

    const userSender = await User.findOne({
      where: {
        accountNumber: senderAccount,
      },
    });

    const userReceiver = await User.findOne({
      where: {
        accountNumber: receiverAccount,
      },
    });

    if (!userSender) {
      return next(
        new AppError(
          'Account number does not exist',
          404
        )
      );
    }

    if (!userReceiver) {
      return next(
        new AppError(
          'Destination account number not found',
          404
        )
      );
    }

    if (
      userSender.accountNumber ===
      userReceiver.accountNumber
    ) {
      return next(
        new AppError(
          'The output account cannot be the same as the destination account',
          400
        )
      );
    }

    if (userSender.amount < amount) {
      return next(
        new AppError('Insufficient balance', 400)
      );
    }

    req.userSender = userSender;
    req.userReceiver = userReceiver;
    req.transferAmount = +amount;

    next();
  }
);
