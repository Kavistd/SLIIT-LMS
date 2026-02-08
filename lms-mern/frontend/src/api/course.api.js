import api from './axios';

export const courseAPI = {
  // Get all courses
  getCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  // Get course by ID
  getCourseById: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  // Get courses by module
  getCoursesByModule: async (moduleId) => {
    const response = await api.get(`/courses?module=${moduleId}`);
    return response.data;
  },

  // Enroll in course
  enrollInCourse: async (courseId) => {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  },

  // Get enrolled courses
  getEnrolledCourses: async () => {
    const response = await api.get('/courses/enrolled');
    return response.data;
  },

  // Get course materials
  getCourseMaterials: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/materials`);
    return response.data;
  },

  // Get course quizzes
  getCourseQuizzes: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/quizzes`);
    return response.data;
  },
};