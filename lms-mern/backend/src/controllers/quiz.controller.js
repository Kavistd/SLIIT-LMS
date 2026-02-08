const asyncHandler = require('../utils/asyncHandler');
const { Quiz } = require('../models');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({}).populate('course', 'title');
  res.json(quizzes);
});

// @desc    Get quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate('course', 'title');

  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Create quiz
// @route   POST /api/quizzes
// @access  Private/Instructor
const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, course, questions, timeLimit, passingScore } = req.body;

  const quiz = await Quiz.create({
    title,
    description,
    course,
    questions,
    timeLimit,
    passingScore,
  });

  if (quiz) {
    res.status(201).json(quiz);
  } else {
    res.status(400);
    throw new Error('Invalid quiz data');
  }
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Instructor
const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    quiz.title = req.body.title || quiz.title;
    quiz.description = req.body.description || quiz.description;
    quiz.course = req.body.course || quiz.course;
    quiz.questions = req.body.questions || quiz.questions;
    quiz.timeLimit = req.body.timeLimit || quiz.timeLimit;
    quiz.passingScore = req.body.passingScore || quiz.passingScore;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Instructor
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    await quiz.remove();
    res.json({ message: 'Quiz removed' });
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

module.exports = {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};