const Class = require('../models/Class');
const Student = require('../models/Student');

const getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find({ teacherId: req.teacher.id });
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

const createClass = async (req, res, next) => {
  const { name, subject, grade, section } = req.body;

  try {
    const newClass = await Class.create({
      teacherId: req.teacher.id,
      name,
      subject,
      grade,
      section
    });
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};

const getClassById = async (req, res, next) => {
  try {
    const classObj = await Class.findOne({ _id: req.params.id, teacherId: req.teacher.id });
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classObj);
  } catch (error) {
    next(error);
  }
};

const updateClass = async (req, res, next) => {
  try {
    const classObj = await Class.findOneAndUpdate(
      { _id: req.params.id, teacherId: req.teacher.id },
      req.body,
      { new: true }
    );
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classObj);
  } catch (error) {
    next(error);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const classObj = await Class.findOneAndDelete({ _id: req.params.id, teacherId: req.teacher.id });
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }
    // Delete associated students
    await Student.deleteMany({ classId: req.params.id });
    res.json({ message: 'Class and associated students deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass
};
