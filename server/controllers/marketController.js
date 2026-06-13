const { getGoldQuote } = require('../services/marketService');

exports.getGoldPrice = async (req, res, next) => {
  try {
    const gold = await getGoldQuote();

    res.status(200).json({
      success: true,
      gold
    });
  } catch (error) {
    next(error);
  }
};
