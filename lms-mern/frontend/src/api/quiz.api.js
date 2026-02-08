import api from './axios';

export const quizAPI = {
  // Get all quizzes
  getQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data;
  },

  // Get quiz by ID
  getQuizById: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  // Get quizzes by course
  getQuizzesByCourse: async (courseId) => {
    const response = await api.get(`/quizzes?course=${courseId}`);
    return response.data;
  },

  // Start quiz attempt
  startQuiz: async (quizId) => {
    const response = await api.post(`/quizzes/${quizId}/start`);
    return response.data;
  },

  // Submit quiz attempt
  submitQuiz: async (quizId, answers) => {
    const response = await api.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  },

  // Get quiz results
  getQuizResults: async (attemptId) => {
    const response = await api.get(`/attempts/${attemptId}`);
    return response.data;
  },

  // Get user quiz attempts
  getUserAttempts: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}/attempts`);
    return response.data;
  },
};