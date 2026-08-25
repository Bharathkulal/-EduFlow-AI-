const Material = require('../models/Material');

const getMaterials = async (req, res, next) => {
  const { limit, type, search } = req.query;

  try {
    let query = { teacherId: req.teacher.id };

    if (type && type !== 'All') {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { chapter: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } }
      ];
    }

    let materialsQuery = Material.find(query).sort({ createdAt: -1 });

    if (limit) {
      materialsQuery = materialsQuery.limit(parseInt(limit));
    }

    const materials = await materialsQuery;
    res.json(materials);
  } catch (error) {
    next(error);
  }
};

const createMaterial = async (req, res, next) => {
  const { classId, subject, chapter, title, type, content, fileUrl, size } = req.body;

  try {
    const newMaterial = await Material.create({
      teacherId: req.teacher.id,
      classId,
      subject,
      chapter,
      title,
      type,
      content,
      fileUrl,
      size: size || '350 KB'
    });
    res.status(201).json(newMaterial);
  } catch (error) {
    next(error);
  }
};

const getMaterialById = async (req, res, next) => {
  try {
    const material = await Material.findOne({ _id: req.params.id, teacherId: req.teacher.id });
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    next(error);
  }
};

const updateMaterial = async (req, res, next) => {
  try {
    const material = await Material.findOneAndUpdate(
      { _id: req.params.id, teacherId: req.teacher.id },
      req.body,
      { new: true }
    );
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    next(error);
  }
};

const deleteMaterial = async (req, res, next) => {
  try {
    const material = await Material.findOneAndDelete({ _id: req.params.id, teacherId: req.teacher.id });
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterials,
  createMaterial,
  getMaterialById,
  updateMaterial,
  deleteMaterial
};
