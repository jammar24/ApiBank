const Transfer = require('../models/transfer.model');
const catchAsync = require('../utils/catchasync');

exports.sendTransfer = catchAsync(
  async (req, res) => {
    const {
      userSender,
      userReceiver,
      transferAmount,
    } = req;

    await userSender.update({
      amount: userSender.amount - transferAmount,
    });
    await userReceiver.update({
      amount:
        userReceiver.amount + transferAmount,
    });

    await Transfer.create({
      amount: transferAmount,
      senderUserId: userSender.id,
      receiverUserId: userReceiver.id,
    });

    res.status(201).json({
      status: 'Success',
      message: 'You made a successful transfer👌',
    });
  }
);
