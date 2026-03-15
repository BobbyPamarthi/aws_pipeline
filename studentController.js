const Student = require('../models/Student');

// POST /api/register
const registerStudent = async (req, res) => {
  try {
    const {
      fullName, collegeBranch, mobileNumber, gender, location,
      alternativeContact, bachelorsTechBranch, interestedTechnologies,
      techStackExperience, careerGoal,
    } = req.body;

    // Create new student document
    const student = new Student({
      fullName,
      collegeBranch,
      mobileNumber,
      gender,
      location,
      alternativeContact: alternativeContact || '',
      bachelorsTechBranch,
      interestedTechnologies,
      techStackExperience: techStackExperience || [],
      careerGoal,
    });

    const savedStudent = await student.save();

    res.status(201).json({
      success: true,
      message: 'Student registered successfully!',
      data: savedStudent,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again.',
    });
  }
};

// GET /api/students - Get all students (admin view)
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
};

module.exports = { registerStudent, getAllStudents };
