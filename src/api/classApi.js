import axiosInstance from './axiosInstance';

export const getClasses = async () => {
  const response = await axiosInstance.get('/classes');
  return response.data;
};

export const createClass = async (classData) => {
  const response = await axiosInstance.post('/classes', classData);
  return response.data;
};

export const updateClass = async (id, classData) => {
  const response = await axiosInstance.put(`/classes/${id}`, classData);
  return response.data;
};

export const deleteClass = async (id) => {
  const response = await axiosInstance.delete(`/classes/${id}`);
  return response.data;
};
