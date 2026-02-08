const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [200, 'Course title cannot be more than 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  module: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module',
    required: true,
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  maxStudents: {
    type: Number,
    required: true,
    min: [1, 'Max students must be at least 1'],
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', courseSchema);