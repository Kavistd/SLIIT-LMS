const express = require('express');
const { getCertificates, getCertificateById, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificate.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(protect, checkRole('admin'), getCertificates)
  .post(protect, checkRole('admin'), createCertificate);

router.route('/:id')
  .get(protect, getCertificateById)
  .put(protect, checkRole('admin'), updateCertificate)
  .delete(protect, checkRole('admin'), deleteCertificate);

module.exports = router;