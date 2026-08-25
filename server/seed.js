require('dotenv').config();
const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');
const Class = require('./models/Class');
const Student = require('./models/Student');
const Material = require('./models/Material');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduflow');
    console.log('Seeding Database...');

    // Clear existing data
    await Teacher.deleteMany({});
    await Class.deleteMany({});
    await Student.deleteMany({});
    await Material.deleteMany({});

    // Create Teacher
    const teacher = await Teacher.create({
      name: 'Sarah Jenkins',
      email: 'teacher@eduflow.ai',
      password: 'teacher123' // Hashed by schema hook
    });
    console.log('Teacher Seeded.');

    // Seed BCA Classes
    const classesData = [
      { name: 'I BCA A', subject: 'Mathematics', grade: 'UG', section: 'A', coverage: 45 },
      { name: 'I BCA B', subject: 'Physics', grade: 'UG', section: 'B', coverage: 40 },
      { name: 'I BCA C', subject: 'Chemistry', grade: 'UG', section: 'C', coverage: 42 },
      { name: 'II BCA A', subject: 'Mathematics', grade: 'UG', section: 'A', coverage: 65 },
      { name: 'II BCA B', subject: 'Biology', grade: 'UG', section: 'B', coverage: 60 },
      { name: 'II BCA C', subject: 'Chemistry', grade: 'UG', section: 'C', coverage: 58 },
      { name: 'III BCA A', subject: 'Mathematics', grade: 'UG', section: 'A', coverage: 85 },
      { name: 'III BCA B', subject: 'Physics', grade: 'UG', section: 'B', coverage: 80 },
      { name: 'III BCA C', subject: 'Biology', grade: 'UG', section: 'C', coverage: 82 }
    ];

    const seededClasses = [];
    for (const c of classesData) {
      const cls = await Class.create({
        teacherId: teacher._id,
        name: c.name,
        subject: c.subject,
        grade: c.grade,
        section: c.section,
        coverage: c.coverage,
        studentsCount: 30 // Seed 30 students per class
      });
      seededClasses.push(cls);
    }
    console.log('Classes Seeded.');

    // Seed Students for class I BCA B (where trigonometric identities issues reside)
    const bcaB = seededClasses.find(c => c.name === 'I BCA B');
    const studentsData = [
      { name: 'Aditya Sharma', email: 'aditya@bca.edu', rollNumber: 'BCA101', performance: 48, weakTopic: 'Trig Identities' },
      { name: 'Deepika Sen', email: 'deepika@bca.edu', rollNumber: 'BCA102', performance: 52, weakTopic: 'Trig Identities' },
      { name: 'Kunal Verma', email: 'kunal@bca.edu', rollNumber: 'BCA103', performance: 55, weakTopic: 'Trig Identities' },
      { name: 'Sneha Roy', email: 'sneha@bca.edu', rollNumber: 'BCA104', performance: 88, weakTopic: 'None' }
    ];

    for (const s of studentsData) {
      await Student.create({
        teacherId: teacher._id,
        classId: bcaB._id,
        name: s.name,
        email: s.email,
        rollNumber: s.rollNumber,
        performance: s.performance,
        weakTopic: s.weakTopic
      });
    }

    // Seed remaining student headcounts (to aggregate 274 total students)
    const remainingCount = 270;
    for (let i = 1; i <= remainingCount; i++) {
      const randomClass = seededClasses[Math.floor(Math.random() * seededClasses.length)];
      await Student.create({
        teacherId: teacher._id,
        classId: randomClass._id,
        name: `Student ${i}`,
        email: `student${i}@bca.edu`,
        rollNumber: `ROLL${i}`,
        performance: Math.floor(Math.random() * 40) + 60,
        weakTopic: i % 15 === 0 ? 'Trig Identities' : 'None'
      });
    }
    console.log('Students Seeded.');

    // Seed Initial Materials
    const materialsData = [
      { subject: 'Mathematics', chapter: 'Trigonometry', title: 'Trigonometry Quiz 1', type: 'Quiz', size: '240 KB' },
      { subject: 'Physics', chapter: 'Motion Mechanics', title: 'Newton Laws Lesson Plan', type: 'Lesson Plan', size: '1.2 MB' },
      { subject: 'Chemistry', chapter: 'Acids & Bases', title: 'Acids Quiz Challenge', type: 'Quiz', size: '110 KB' },
      { subject: 'Biology', chapter: 'Cell Structures', title: 'Cell Anatomy Worksheet', type: 'Worksheet', size: '850 KB' }
    ];

    for (const m of materialsData) {
      await Material.create({
        teacherId: teacher._id,
        classId: seededClasses[0]._id,
        subject: m.subject,
        chapter: m.chapter,
        title: m.title,
        type: m.type,
        content: { info: `Seeded ${m.type} data` },
        size: m.size
      });
    }
    console.log('Materials Seeded.');

    console.log('Seeding Database Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Database Failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
