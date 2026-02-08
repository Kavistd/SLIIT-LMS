const express = require('express');
const { getPosts, getPostById, createPost, updatePost, deletePost, addComment } = require('../controllers/post.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router;