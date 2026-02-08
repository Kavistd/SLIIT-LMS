const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middlewares/error.middleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/departments', require('./routes/department.routes'));
app.use('/api/modules', require('./routes/module.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/quizzes', require('./routes/quiz.routes'));
app.use('/api/attempts', require('./routes/attempt.routes'));
app.use('/api/certificates', require('./routes/certificate.routes'));
app.use('/api/materials', require('./routes/material.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'LMS API is running...' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;