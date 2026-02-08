const asyncHandler = require('../utils/asyncHandler');
const { Attempt } = require('../models');

// @desc    Get all attempts
// @route   GET /api/attempts
// @access  Private/Admin
const getAttempts = asyncHandler(async (req, res) => {
  const attempts = await Attempt.find({})
    .populate('user', 'name email')
    .populate('quiz', 'title');
  res.json(attempts);
});

// @desc    Get attempt by ID
// @route   GET /api/attempts/:id
// @access  Private
const getAttemptById = asyncHandler(async (req, res) => {
  const attempt = await Attempt.findById(req.params.id)
    .populate('user', 'name email')
    .populate('quiz', 'title');

  if (attempt) {
    res.json(attempt);
  } else {
    res.status(404);
    throw new Error('Attempt not found');
  }
});

// @desc    Create attempt
// @route   POST /api/attempts
// @access  Private
const createAttempt = asyncHandler(async (req, res) => {
  const { quiz, answers, score, completedAt } = req.body;

  const attempt = await Attempt.create({
    user: req.user._id,
    quiz,
    answers,
    score,
    completedAt,
  });

  if (attempt) {
    res.status(201).json(attempt);
  } else {
    res.status(400);
    throw new Error('Invalid attempt data');
  }
});

// @desc    Update attempt
// @route   PUT /api/attempts/:id
// @access  Private/Admin
const updateAttempt = asyncHandler(async (req, res) => {
  const attempt = await Attempt.findById(req.params.id);

  if (attempt) {
    attempt.user = req.body.user || attempt.user;
    attempt.quiz = req.body.quiz || attempt.quiz;
    attempt.answers = req.body.answers || attempt.answers;
    attempt.score = req.body.score || attempt.score;
    attempt.completedAt = req.body.completedAt || attempt.completedAt;

    const updatedAttempt = await attempt.save();
    res.json(updatedAttempt);
  } else {
    res.status(404);
    throw new Error('Attempt not found');
  }
});

// @desc    Delete attempt
// @route   DELETE /api/attempts/:id
// @access  Private/Admin
const deleteAttempt = asyncHandler(async (req, res) => {
  const attempt = await Attempt.findById(req.params.id);

  if (attempt) {
    await attempt.remove();
    res.json({ message: 'Attempt removed' });
  } else {
    res.status(404);
    throw new Error('Attempt not found');
  }
});

module.exports = {
  getAttempts,
  getAttemptById,
  createAttempt,
  updateAttempt,
  deleteAttempt,
};