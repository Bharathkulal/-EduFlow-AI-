const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '30d'
  });
};

// Register Teacher
const registerTeacher = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const teacherExists = await Teacher.findOne({ email });

    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher already exists with this email' });
    }

    const teacher = await Teacher.create({
      name,
      email,
      password
    });

    if (teacher) {
      res.status(201).json({
        _id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        token: generateToken(teacher._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid teacher data' });
    }
  } catch (error) {
    next(error);
  }
};

// Login Teacher
const loginTeacher = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (teacher && (await teacher.comparePassword(password))) {
      res.json({
        _id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        token: generateToken(teacher._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// Get profile
const getMe = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select('-password');
    res.json(teacher);
  } catch (error) {
    next(error);
  }
};

// Logout (Handled client-side by clearing tokens, return 200)
const logoutTeacher = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  registerTeacher,
  loginTeacher,
  getMe,
  logoutTeacher
};
