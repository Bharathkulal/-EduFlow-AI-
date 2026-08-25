const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  subjects: {
    type: [String],
    default: ['Mathematics', 'Physics', 'Chemistry', 'Biology']
  },
  classes: {
    type: [String],
    default: ['I BCA A', 'I BCA B', 'I BCA C', 'II BCA A', 'II BCA B', 'II BCA C', 'III BCA A', 'III BCA B', 'III BCA C']
  }
}, { timestamps: true });

// Hash password before saving
TeacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
TeacherSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Teacher', TeacherSchema);
