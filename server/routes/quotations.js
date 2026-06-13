const express = require('express');
const router = express.Router();
const {
  estimateQuotation,
  createQuotation,
  getMyQuotations,
  getAllQuotations,
  getQuotation,
  updateQuotation,
  deleteQuotation
} = require('../controllers/quotationController');
const { protect, restrictTo } = require('../middleware/auth');

router.post('/estimate', estimateQuotation);
router.post('/', protect, createQuotation);
router.get('/my-quotations', protect, getMyQuotations);
router.get('/', protect, restrictTo('admin'), getAllQuotations);
router.get('/:id', protect, getQuotation);
router.put('/:id', protect, restrictTo('admin'), updateQuotation);
router.delete('/:id', protect, deleteQuotation);

module.exports = router;
