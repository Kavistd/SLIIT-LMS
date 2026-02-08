const mongoose = require('mongoose');

const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateRole = (role) => {
  const validRoles = ['student', 'instructor', 'admin'];
  return validRoles.includes(role);
};

const validateFileType = (fileType) => {
  const validTypes = ['video', 'document', 'audio', 'image', 'link'];
  return validTypes.includes(fileType);
};

const validateNotificationType = (type) => {
  const validTypes = ['info', 'success', 'warning', 'error'];
  return validTypes.includes(type);
};

module.exports = {
  validateObjectId,
  validateEmail,
  validatePassword,
  validateRole,
  validateFileType,
  validateNotificationType,
};