import api from './axios';

export const postAPI = {
  // Get all posts
  getPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Get post by ID
  getPostById: async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  },

  // Get posts by course
  getPostsByCourse: async (courseId) => {
    const response = await api.get(`/posts?course=${courseId}`);
    return response.data;
  },

  // Create post
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Update post
  updatePost: async (postId, postData) => {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
  },

  // Delete post
  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },

  // Add comment to post
  addComment: async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  },

  // Like post
  likePost: async (postId) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },
};