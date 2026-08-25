const express = require('express');
const router = express.Router();
const {
  generateLessonPlan,
  generateQuestionPaper,
  generateQuiz,
  generateWorksheet,
  generatePPT,
  gradeStudentAnswer,
  uploadChapterFile
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect); // Secure all AI generator routes

router.post('/lesson-plan', generateLessonPlan);
router.post('/question-paper', generateQuestionPaper);
router.post('/quiz', generateQuiz);
router.post('/worksheet', generateWorksheet);
router.post('/ppt', generatePPT);
router.post('/grade-answer', gradeStudentAnswer);

// File upload endpoint
router.post('/chapters/upload', upload.single('file'), uploadChapterFile);

module.exports = router;
