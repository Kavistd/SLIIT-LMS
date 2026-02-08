const asyncHandler = require('../utils/asyncHandler');
const { Department } = require('../models');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({});
  res.json(departments);
});

// @desc    Get department by ID
// @route   GET /api/departments/:id
// @access  Public
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

// @desc    Create department
// @route   POST /api/departments
// @access  Private/Admin
const createDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const department = await Department.create({
    name,
    description,
  });

  if (department) {
    res.status(201).json(department);
  } else {
    res.status(400);
    throw new Error('Invalid department data');
  }
});

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private/Admin
const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    department.name = req.body.name || department.name;
    department.description = req.body.description || department.description;

    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private/Admin
const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    await department.remove();
    res.json({ message: 'Department removed' });
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};