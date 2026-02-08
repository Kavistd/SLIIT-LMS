const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'document', 'audio', 'image', 'link'],
  },
  fileUrl: {
    type: String,
    required: function() {
      return this.type !== 'link';
    },
  },
  linkUrl: {
    type: String,
    required: function() {
      return this.type === 'link';
    },
  },
  size: {
    type: Number, // in bytes
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Material', materialSchema);