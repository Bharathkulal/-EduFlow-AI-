const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

const protect = async (req, res, next) => {
  let token;

  // Retrieve token from Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[2] || req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.teacher = await Teacher.findById(decoded.id).select('-password');
    if (!req.teacher) {
      return res.status(401).json({ message: 'Teacher not found' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = { protect };
