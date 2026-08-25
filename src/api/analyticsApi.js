import axiosInstance from './axiosInstance';

export const getPerformanceAnalytics = async () => {
  const response = await axiosInstance.get('/analytics/performance');
  return response.data;
};
