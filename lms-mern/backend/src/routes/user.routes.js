const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(protect, checkRole('admin'), getUsers);

router.route('/:id')
  .get(protect, checkRole('admin'), getUserById)
  .put(protect, checkRole('admin'), updateUser)
  .delete(protect, checkRole('admin'), deleteUser);

module.exports = router;