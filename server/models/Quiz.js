const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  questions: [{
    questionText: String,
    options: [String],
    correctAnswer: String
  }],
  totalMarks: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
