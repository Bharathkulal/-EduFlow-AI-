const express = require('express');
const router = express.Router();
const { registerTeacher, loginTeacher, getMe, logoutTeacher } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutTeacher);

module.exports = router;
