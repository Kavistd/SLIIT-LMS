const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: [0, 'Score must be at least 0'],
    max: [100, 'Score cannot exceed 100'],
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  certificateNumber: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);