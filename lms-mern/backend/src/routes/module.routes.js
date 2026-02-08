const express = require('express');
const { getModules, getModuleById, createModule, updateModule, deleteModule } = require('../controllers/module.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getModules)
  .post(protect, checkRole('admin'), createModule);

router.route('/:id')
  .get(getModuleById)
  .put(protect, checkRole('admin'), updateModule)
  .delete(protect, checkRole('admin'), deleteModule);

module.exports = router;