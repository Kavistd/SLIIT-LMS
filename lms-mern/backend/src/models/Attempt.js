const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz.questions',
    required: true,
  },
  selectedOption: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const attemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  answers: [answerSchema],
  score: {
    type: Number,
    required: true,
    min: [0, 'Score must be at least 0'],
    max: [100, 'Score cannot exceed 100'],
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  timeTaken: {
    type: Number, // in minutes
  },
});

module.exports = mongoose.model('Attempt', attemptSchema);