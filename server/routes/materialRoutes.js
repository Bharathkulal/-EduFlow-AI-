const express = require('express');
const router = express.Router();
const { getMaterials, createMaterial, getMaterialById, updateMaterial, deleteMaterial } = require('../controllers/materialController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Secure all material routes

router.route('/')
  .get(getMaterials)
  .post(createMaterial);

router.route('/:id')
  .get(getMaterialById)
  .put(updateMaterial)
  .delete(deleteMaterial);

module.exports = router;
