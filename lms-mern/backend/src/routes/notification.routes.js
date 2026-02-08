const express = require('express');
const { getNotifications, getNotificationById, createNotification, updateNotification, deleteNotification, markAsRead } = require('../controllers/notification.controller');
const { protect, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(protect, getNotifications)
  .post(protect, checkRole('admin'), createNotification);

router.route('/:id')
  .get(protect, getNotificationById)
  .put(protect, checkRole('admin'), updateNotification)
  .delete(protect, checkRole('admin'), deleteNotification);

router.route('/:id/read')
  .put(protect, markAsRead);

module.exports = router;