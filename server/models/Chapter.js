const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
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
  chapterName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Chapter', ChapterSchema);
