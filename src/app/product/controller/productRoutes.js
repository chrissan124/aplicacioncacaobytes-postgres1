const express = require('express');
const {
  default: makeExpressCallback,
} = require('../../common/controllers/expressCallback');

const router = express.Router();

router.post('', makeExpressCallback());

module.exports = router;
