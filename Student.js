const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    // Page 1 - Personal Info
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    collegeBranch: {
      type: String,
      required: [true, 'College branch is required'],
      enum: {
        values: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'IT'],
        message: 'Invalid college branch',
      },
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: 'Invalid gender',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    alternativeContact: {
      type: String,
      match: [/^\d{10}$/, 'Alternative contact must be exactly 10 digits'],
      default: '',
    },

    // Page 2 - Tech Interests
    bachelorsTechBranch: {
      type: String,
      required: [true, "Bachelor's tech branch is required"],
      enum: {
        values: ['Computer Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil'],
        message: "Invalid bachelor's tech branch",
      },
    },
    interestedTechnologies: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one technology interest is required',
      },
      enum: {
        values: [
          'Cloud Computing',
          'DevOps',
          'Artificial Intelligence',
          'Machine Learning',
          'Data Science',
          'Full Stack Development',
          'Cyber Security',
          'Blockchain',
        ],
      },
    },
    techStackExperience: {
      type: [String],
      enum: {
        values: ['Python', 'Java', 'JavaScript', 'React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP'],
      },
      default: [],
    },
    careerGoal: {
      type: String,
      required: [true, 'Career goal is required'],
      trim: true,
      maxlength: [500, 'Career goal cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', studentSchema);
