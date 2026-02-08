const express = require('express');
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/course.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, checkRole('admin'), createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(protect, checkRole('admin'), updateCourse)
  .delete(protect, checkRole('admin'), deleteCourse);

module.exports = router;