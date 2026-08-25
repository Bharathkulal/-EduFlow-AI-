const Student = require('../models/Student');
const Class = require('../models/Class');

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({ teacherId: req.teacher.id }).populate('classId', 'name');
    res.json(students);
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  const { classId, name, email, rollNumber, performance, weakTopic } = req.body;

  try {
    const studentClass = await Class.findOne({ _id: classId, teacherId: req.teacher.id });
    if (!studentClass) {
      return res.status(400).json({ message: 'Target classroom not found' });
    }

    const newStudent = await Student.create({
      teacherId: req.teacher.id,
      classId,
      name,
      email,
      rollNumber,
      performance,
      weakTopic
    });

    // Update students count in Class model
    studentClass.studentsCount += 1;
    await studentClass.save();

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, teacherId: req.teacher.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, teacherId: req.teacher.id },
      req.body,
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findOneAndDelete({ _id: req.params.id, teacherId: req.teacher.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Decrement class count
    const studentClass = await Class.findById(student.classId);
    if (studentClass && studentClass.studentsCount > 0) {
      studentClass.studentsCount -= 1;
      await studentClass.save();
    }

    res.json({ message: 'Student record deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
};
