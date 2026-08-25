const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ['Lesson Plan', 'Question Paper', 'Quiz', 'Worksheet', 'Homework', 'PPT', 'Study Material']
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  fileUrl: {
    type: String
  },
  size: {
    type: String,
    default: '320 KB'
  }
}, { timestamps: true });

module.exports = mongoose.model('Material', MaterialSchema);
