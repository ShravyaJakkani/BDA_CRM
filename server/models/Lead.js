const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: {
    type: String,
    required: [true, 'Please provide a lead name'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please provide a company name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Converted'],
    default: 'New'
  },
  notes: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
