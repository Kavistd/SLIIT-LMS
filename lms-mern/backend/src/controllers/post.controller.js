const asyncHandler = require('../utils/asyncHandler');
const { Post } = require('../models');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('author', 'name email')
    .populate('course', 'title')
    .sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name email')
    .populate('course', 'title')
    .populate('comments.author', 'name email');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, course } = req.body;

  const post = await Post.create({
    title,
    content,
    author: req.user._id,
    course,
  });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(400);
    throw new Error('Invalid post data');
  }
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    // Check if user owns post
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    // Check if user owns post
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    const comment = {
      author: req.user._id,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
};