const express = require('express');
const router = express.Router();
const { getClasses, createClass, getClassById, updateClass, deleteClass } = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Secure all class routes

router.route('/')
  .get(getClasses)
  .post(createClass);

router.route('/:id')
  .get(getClassById)
  .put(updateClass)
  .delete(deleteClass);

module.exports = router;
