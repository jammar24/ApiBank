const express = require('express');

const routerTransfer = express.Router();

const transferController = require('../controllers/transfers.controller');
const {
  handleTransferErrors,
} = require('../middlewares/transfer.middleware');
const {
  TransferValidation,
} = require('../middlewares/validations.middleware');

routerTransfer.post(
  '/',
  TransferValidation,
  handleTransferErrors,
  transferController.sendTransfer
);

module.exports = routerTransfer;
