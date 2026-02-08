const express = require('express');
const { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } = require('../controllers/quiz.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getQuizzes)
  .post(protect, checkRole('instructor'), createQuiz);

router.route('/:id')
  .get(getQuizById)
  .put(protect, checkRole('instructor'), updateQuiz)
  .delete(protect, checkRole('instructor'), deleteQuiz);

module.exports = router;