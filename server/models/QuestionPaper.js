const mongoose = require('mongoose');

const QuestionPaperSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  subject: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  numberOfQuestions: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  questions: [{
    questionText: String,
    marks: Number,
    type: {
      type: String,
      enum: ['MCQ', 'Short', 'Long']
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('QuestionPaper', QuestionPaperSchema);
