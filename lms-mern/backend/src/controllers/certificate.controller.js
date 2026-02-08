const asyncHandler = require('../utils/asyncHandler');
const { Certificate } = require('../models');
const pdfService = require('../services/pdf.service');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Private/Admin
const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find({})
    .populate('user', 'name email')
    .populate('course', 'title');
  res.json(certificates);
});

// @desc    Get certificate by ID
// @route   GET /api/certificates/:id
// @access  Private
const getCertificateById = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id)
    .populate('user', 'name email')
    .populate('course', 'title');

  if (certificate) {
    res.json(certificate);
  } else {
    res.status(404);
    throw new Error('Certificate not found');
  }
});

// @desc    Create certificate
// @route   POST /api/certificates
// @access  Private/Admin
const createCertificate = asyncHandler(async (req, res) => {
  const { user, course, score, issuedAt } = req.body;

  const certificate = await Certificate.create({
    user,
    course,
    score,
    issuedAt,
  });

  if (certificate) {
    // Generate PDF certificate
    const pdfBuffer = await pdfService.generateCertificate(certificate);
    
    res.status(201).json({
      ...certificate._doc,
      pdfBuffer: pdfBuffer.toString('base64')
    });
  } else {
    res.status(400);
    throw new Error('Invalid certificate data');
  }
});

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private/Admin
const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);

  if (certificate) {
    certificate.user = req.body.user || certificate.user;
    certificate.course = req.body.course || certificate.course;
    certificate.score = req.body.score || certificate.score;
    certificate.issuedAt = req.body.issuedAt || certificate.issuedAt;

    const updatedCertificate = await certificate.save();
    res.json(updatedCertificate);
  } else {
    res.status(404);
    throw new Error('Certificate not found');
  }
});

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);

  if (certificate) {
    await certificate.remove();
    res.json({ message: 'Certificate removed' });
  } else {
    res.status(404);
    throw new Error('Certificate not found');
  }
});

module.exports = {
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};