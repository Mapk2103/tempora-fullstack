const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  weight: {
    type: Number,
    required: [true, 'El peso es obligatorio'],
    min: [0.1, 'El peso mínimo es 0.1 gramos']
  },
  purity: {
    type: String,
    required: [true, 'La pureza es obligatoria'],
    enum: ['24k', '18k', '14k', '10k']
  },
  type: {
    type: String,
    required: [true, 'El tipo es obligatorio'],
    enum: ['jewelry', 'coins', 'bars']
  },
  goldPrice: {
    type: Number,
    required: [true, 'El precio del oro es obligatorio']
  },
  estimatedValue: {
    type: Number,
    required: [true, 'El valor estimado es obligatorio']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

quotationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Quotation', quotationSchema);
