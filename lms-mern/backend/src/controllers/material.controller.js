const asyncHandler = require('../utils/asyncHandler');
const { Material } = require('../models');
const cloudinary = require('../config/cloudinary');
const upload = require('../middlewares/upload.middleware');

// @desc    Get all materials
// @route   GET /api/materials
// @access  Public
const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find({}).populate('course', 'title');
  res.json(materials);
});

// @desc    Get material by ID
// @route   GET /api/materials/:id
// @access  Public
const getMaterialById = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id).populate('course', 'title');

  if (material) {
    res.json(material);
  } else {
    res.status(404);
    throw new Error('Material not found');
  }
});

// @desc    Create material
// @route   POST /api/materials
// @access  Private/Instructor
const createMaterial = [
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const { title, description, course, type } = req.body;
    let fileUrl = '';

    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'lms-materials',
      });
      fileUrl = result.secure_url;
    }

    const material = await Material.create({
      title,
      description,
      course,
      type,
      fileUrl,
    });

    if (material) {
      res.status(201).json(material);
    } else {
      res.status(400);
      throw new Error('Invalid material data');
    }
  })
];

// @desc    Update material
// @route   PUT /api/materials/:id
// @access  Private/Instructor
const updateMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (material) {
    material.title = req.body.title || material.title;
    material.description = req.body.description || material.description;
    material.course = req.body.course || material.course;
    material.type = req.body.type || material.type;

    if (req.body.fileUrl) {
      material.fileUrl = req.body.fileUrl;
    }

    const updatedMaterial = await material.save();
    res.json(updatedMaterial);
  } else {
    res.status(404);
    throw new Error('Material not found');
  }
});

// @desc    Delete material
// @route   DELETE /api/materials/:id
// @access  Private/Instructor
const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (material) {
    await material.remove();
    res.json({ message: 'Material removed' });
  } else {
    res.status(404);
    throw new Error('Material not found');
  }
});

module.exports = {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};