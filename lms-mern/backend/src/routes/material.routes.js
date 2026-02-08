const express = require('express');
const { getMaterials, getMaterialById, createMaterial, updateMaterial, deleteMaterial } = require('../controllers/material.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getMaterials)
  .post(protect, checkRole('instructor'), createMaterial);

router.route('/:id')
  .get(getMaterialById)
  .put(protect, checkRole('instructor'), updateMaterial)
  .delete(protect, checkRole('instructor'), deleteMaterial);

module.exports = router;