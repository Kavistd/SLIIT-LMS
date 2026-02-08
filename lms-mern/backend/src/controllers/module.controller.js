const asyncHandler = require('../utils/asyncHandler');
const { Module } = require('../models');

// @desc    Get all modules
// @route   GET /api/modules
// @access  Public
const getModules = asyncHandler(async (req, res) => {
  const modules = await Module.find({}).populate('department', 'name');
  res.json(modules);
});

// @desc    Get module by ID
// @route   GET /api/modules/:id
// @access  Public
const getModuleById = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id).populate('department', 'name');

  if (module) {
    res.json(module);
  } else {
    res.status(404);
    throw new Error('Module not found');
  }
});

// @desc    Create module
// @route   POST /api/modules
// @access  Private/Admin
const createModule = asyncHandler(async (req, res) => {
  const { name, description, department, credits, duration } = req.body;

  const module = await Module.create({
    name,
    description,
    department,
    credits,
    duration,
  });

  if (module) {
    res.status(201).json(module);
  } else {
    res.status(400);
    throw new Error('Invalid module data');
  }
});

// @desc    Update module
// @route   PUT /api/modules/:id
// @access  Private/Admin
const updateModule = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id);

  if (module) {
    module.name = req.body.name || module.name;
    module.description = req.body.description || module.description;
    module.department = req.body.department || module.department;
    module.credits = req.body.credits || module.credits;
    module.duration = req.body.duration || module.duration;

    const updatedModule = await module.save();
    res.json(updatedModule);
  } else {
    res.status(404);
    throw new Error('Module not found');
  }
});

// @desc    Delete module
// @route   DELETE /api/modules/:id
// @access  Private/Admin
const deleteModule = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id);

  if (module) {
    await module.remove();
    res.json({ message: 'Module removed' });
  } else {
    res.status(404);
    throw new Error('Module not found');
  }
});

module.exports = {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
};