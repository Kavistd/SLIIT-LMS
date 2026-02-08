const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a module name'],
    trim: true,
    maxlength: [100, 'Module name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
    required: true,
  },
  credits: {
    type: Number,
    required: true,
    min: [1, 'Credits must be at least 1'],
    max: [10, 'Credits cannot exceed 10'],
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1'],
    max: [12, 'Duration cannot exceed 12 months'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Module', moduleSchema);