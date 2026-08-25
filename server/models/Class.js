const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  studentsCount: {
    type: Number,
    default: 0
  },
  coverage: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Class', ClassSchema);
