const express = require('express');
const { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getDepartments)
  .post(protect, checkRole('admin'), createDepartment);

router.route('/:id')
  .get(getDepartmentById)
  .put(protect, checkRole('admin'), updateDepartment)
  .delete(protect, checkRole('admin'), deleteDepartment);

module.exports = router;