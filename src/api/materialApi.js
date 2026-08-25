import axiosInstance from './axiosInstance';

export const getMaterials = async (params = {}) => {
  const response = await axiosInstance.get('/materials', { params });
  return response.data;
};

export const createMaterial = async (materialData) => {
  const response = await axiosInstance.post('/materials', materialData);
  return response.data;
};

export const deleteMaterial = async (id) => {
  const response = await axiosInstance.delete(`/materials/${id}`);
  return response.data;
};
