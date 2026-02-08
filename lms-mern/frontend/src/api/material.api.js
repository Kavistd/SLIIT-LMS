import api from './axios';

export const materialAPI = {
  // Get all materials
  getMaterials: async () => {
    const response = await api.get('/materials');
    return response.data;
  },

  // Get material by ID
  getMaterialById: async (materialId) => {
    const response = await api.get(`/materials/${materialId}`);
    return response.data;
  },

  // Get materials by course
  getMaterialsByCourse: async (courseId) => {
    const response = await api.get(`/materials?course=${courseId}`);
    return response.data;
  },

  // Upload material
  uploadMaterial: async (courseId, materialData) => {
    const formData = new FormData();
    formData.append('title', materialData.title);
    formData.append('description', materialData.description);
    formData.append('type', materialData.type);
    if (materialData.file) {
      formData.append('file', materialData.file);
    }

    const response = await api.post(`/materials`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update material
  updateMaterial: async (materialId, materialData) => {
    const response = await api.put(`/materials/${materialId}`, materialData);
    return response.data;
  },

  // Delete material
  deleteMaterial: async (materialId) => {
    const response = await api.delete(`/materials/${materialId}`);
    return response.data;
  },
};