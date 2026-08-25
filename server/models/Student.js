const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  performance: {
    type: Number,
    default: 75
  },
  weakTopic: {
    type: String,
    default: 'None'
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
