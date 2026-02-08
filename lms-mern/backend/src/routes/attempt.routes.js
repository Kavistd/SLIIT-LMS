const express = require('express');
const { getAttempts, getAttemptById, createAttempt, updateAttempt, deleteAttempt } = require('../controllers/attempt.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(protect, checkRole('admin'), getAttempts)
  .post(protect, createAttempt);

router.route('/:id')
  .get(protect, getAttemptById)
  .put(protect, checkRole('admin'), updateAttempt)
  .delete(protect, checkRole('admin'), deleteAttempt);

module.exports = router;