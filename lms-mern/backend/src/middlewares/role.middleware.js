const asyncHandler = require('../utils/asyncHandler');

// @desc    Check if user has required role
// @param   {string} role - Required role
const checkRole = (role) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized');
    }

    if (req.user.role !== role && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized, insufficient permissions');
    }

    next();
  });
};

module.exports = { checkRole };