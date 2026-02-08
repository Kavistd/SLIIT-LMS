const asyncHandler = require('../utils/asyncHandler');
const { Course } = require('../models');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .populate('module', 'name')
    .populate('instructor', 'name email');
  res.json(courses);
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('module', 'name')
    .populate('instructor', 'name email');

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Create course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, module, instructor, startDate, endDate, maxStudents } = req.body;

  const course = await Course.create({
    title,
    description,
    module,
    instructor,
    startDate,
    endDate,
    maxStudents,
  });

  if (course) {
    res.status(201).json(course);
  } else {
    res.status(400);
    throw new Error('Invalid course data');
  }
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.module = req.body.module || course.module;
    course.instructor = req.body.instructor || course.instructor;
    course.startDate = req.body.startDate || course.startDate;
    course.endDate = req.body.endDate || course.endDate;
    course.maxStudents = req.body.maxStudents || course.maxStudents;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};