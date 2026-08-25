const aiService = require('../services/aiService');
const Material = require('../models/Material');
const Quiz = require('../models/Quiz');
const QuestionPaper = require('../models/QuestionPaper');
const Chapter = require('../models/Chapter');

// Helper to determine simulated file size
const getSimulatedSize = () => `${Math.floor(Math.random() * 800) + 150} KB`;

const generateLessonPlan = async (req, res, next) => {
  const { subject, chapter, classId } = req.body;
  try {
    const lessonContent = await aiService.generateLessonPlan(subject, chapter);
    const material = await Material.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      title: `Lesson Plan: ${chapter}`,
      type: 'Lesson Plan',
      content: lessonContent,
      size: '1.2 MB'
    });
    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
};

const generateQuestionPaper = async (req, res, next) => {
  const { subject, chapter, totalMarks, numberOfQuestions, difficulty, duration, classId } = req.body;
  try {
    const questions = await aiService.generateQuestionPaper(subject, chapter, totalMarks, numberOfQuestions, difficulty);
    
    // Save to QuestionPaper model
    const qPaper = await QuestionPaper.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      totalMarks,
      numberOfQuestions,
      difficulty,
      duration: duration || 120,
      questions
    });

    // Save to Material model
    const material = await Material.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      title: `Question Paper: ${chapter} (${difficulty.toUpperCase()})`,
      type: 'Question Paper',
      content: qPaper,
      size: getSimulatedSize()
    });

    res.status(201).json({ material, questionPaper: qPaper });
  } catch (error) {
    next(error);
  }
};

const generateQuiz = async (req, res, next) => {
  const { subject, chapter, totalMarks, duration, classId, count } = req.body;
  try {
    const questions = await aiService.generateQuiz(subject, chapter, count || 5);
    
    // Save to Quiz model
    const quiz = await Quiz.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      title: `Quiz Challenge: ${chapter}`,
      questions,
      totalMarks: totalMarks || 20,
      duration: duration || 30
    });

    // Save to Material model
    const material = await Material.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      title: `Quiz: ${chapter}`,
      type: 'Quiz',
      content: quiz,
      size: getSimulatedSize()
    });

    res.status(201).json({ material, quiz });
  } catch (error) {
    next(error);
  }
};

const generateWorksheet = async (req, res, next) => {
  const { subject, chapter, classId } = req.body;
  try {
    const worksheetContent = await aiService.generateWorksheet(subject, chapter);
    const material = await Material.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      title: `Worksheet: ${chapter}`,
      type: 'Worksheet',
      content: worksheetContent,
      size: getSimulatedSize()
    });
    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
};

const generatePPT = async (req, res, next) => {
  const { subject, chapter, classId } = req.body;
  try {
    const pptSlides = await aiService.generatePPT(subject, chapter);
    const material = await Material.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      title: `PPT Outline: ${chapter}`,
      type: 'PPT',
      content: pptSlides,
      size: '2.5 MB'
    });
    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
};

const gradeStudentAnswer = async (req, res, next) => {
  const { questionText, studentAnswer, modelAnswer } = req.body;
  try {
    const evaluation = await aiService.gradeAnswer(questionText, studentAnswer, modelAnswer);
    res.json(evaluation);
  } catch (error) {
    next(error);
  }
};

// Chapter PDF File Upload Logic
const uploadChapterFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF or chapter file' });
    }

    const { subject, classId, chapterName } = req.body;
    
    // Save to Chapter collection
    const chapter = await Chapter.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapterName: chapterName || req.file.originalname.replace(/\.[^/.]+$/, ""),
      fileUrl: req.file.path, // Cloudinary URL
      extractedText: `Extracted summary of chapters relating to ${chapterName || 'Uploaded Chapter'}`
    });

    // Auto-generate a default Lesson Plan based on the uploaded chapter
    const lessonContent = await aiService.generateLessonPlan(subject, chapter.chapterName);
    const material = await Material.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter: chapter.chapterName,
      title: `Lesson Plan: ${chapter.chapterName}`,
      type: 'Lesson Plan',
      content: lessonContent,
      fileUrl: req.file.path,
      size: '1.4 MB'
    });

    res.status(201).json({ chapter, material });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateLessonPlan,
  generateQuestionPaper,
  generateQuiz,
  generateWorksheet,
  generatePPT,
  gradeStudentAnswer,
  uploadChapterFile
};
