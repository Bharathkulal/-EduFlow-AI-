import axiosInstance from './axiosInstance';

export const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axiosInstance.post('/auth/register', { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    console.error('Logout error on backend', error);
  }
  localStorage.removeItem('token');
};
