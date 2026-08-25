import axiosInstance from './axiosInstance';

export const generateLessonPlan = async (subject, chapter, classId) => {
  const response = await axiosInstance.post('/ai/lesson-plan', { subject, chapter, classId });
  return response.data;
};

export const generateQuestionPaper = async (params) => {
  const response = await axiosInstance.post('/ai/question-paper', params);
  return response.data;
};

export const generateQuiz = async (params) => {
  const response = await axiosInstance.post('/ai/quiz', params);
  return response.data;
};

export const generateWorksheet = async (subject, chapter, classId) => {
  const response = await axiosInstance.post('/ai/worksheet', { subject, chapter, classId });
  return response.data;
};

export const generatePPT = async (subject, chapter, classId) => {
  const response = await axiosInstance.post('/ai/ppt', { subject, chapter, classId });
  return response.data;
};

export const gradeAnswer = async (questionText, studentAnswer, modelAnswer) => {
  const response = await axiosInstance.post('/ai/grade-answer', { questionText, studentAnswer, modelAnswer });
  return response.data;
};

// Multipart file upload pipeline
export const uploadChapter = async (formData) => {
  const response = await axiosInstance.post('/ai/chapters/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
