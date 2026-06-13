const express = require('express');
const { getGoldPrice } = require('../controllers/marketController');

const router = express.Router();

router.get('/gold', getGoldPrice);

module.exports = router;
