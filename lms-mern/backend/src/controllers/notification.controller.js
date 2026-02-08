const asyncHandler = require('../utils/asyncHandler');
const { Notification } = require('../models');
const notificationService = require('../services/notification.service');

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  res.json(notifications);
});

// @desc    Get notification by ID
// @route   GET /api/notifications/:id
// @access  Private
const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)
    .populate('user', 'name email');

  if (notification) {
    res.json(notification);
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
});

// @desc    Create notification
// @route   POST /api/notifications
// @access  Private/Admin
const createNotification = asyncHandler(async (req, res) => {
  const { user, title, message, type } = req.body;

  const notification = await Notification.create({
    user,
    title,
    message,
    type,
  });

  if (notification) {
    // Send notification
    await notificationService.sendNotification(notification);
    res.status(201).json(notification);
  } else {
    res.status(400);
    throw new Error('Invalid notification data');
  }
});

// @desc    Update notification
// @route   PUT /api/notifications/:id
// @access  Private/Admin
const updateNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.title = req.body.title || notification.title;
    notification.message = req.body.message || notification.message;
    notification.type = req.body.type || notification.type;
    notification.read = req.body.read !== undefined ? req.body.read : notification.read;

    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private/Admin
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    await notification.remove();
    res.json({ message: 'Notification removed' });
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.read = true;
    await notification.save();
    res.json(notification);
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
});

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
};