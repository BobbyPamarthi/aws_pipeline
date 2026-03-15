# 🎓 Student Registration Portal

A modern, full-stack student registration system built with **React.js**, **Node.js/Express**, and **MongoDB**. Students can register their personal details and technology interests through a clean, multi-step form.

---

## 📸 Features

- ✅ **Two-page multi-step form** with state persistence
- ✅ **Client-side validation** with real-time error feedback
- ✅ **10-digit mobile number validation**
- ✅ **Multi-select checkboxes** for tech interests & stack
- ✅ **Registration summary** page after submission
- ✅ **REST API** with Mongoose schema validation
- ✅ **MongoDB** storage with timestamps
- ✅ **Fully responsive** mobile-first design
- ✅ **Loading states** and error handling

---

## 🗂️ Project Structure

```
student-registration/
├── frontend/                    # React.js application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputField.jsx   # Reusable form field wrapper
│   │   │   └── StepIndicator.jsx # Multi-step progress indicator
│   │   ├── pages/
│   │   │   ├── RegistrationPage.jsx  # Page 1: Personal details
│   │   │   ├── TechInterestPage.jsx  # Page 2: Tech interests
│   │   │   └── SuccessPage.jsx       # Submission summary
│   │   ├── services/
│   │   │   └── api.js           # Axios API service layer
│   │   ├── App.js               # Root component with routing logic
│   │   ├── App.css              # Global styles & design system
│   │   └── index.js
│   └── package.json
│
├── backend/                     # Node.js/Express API
│   ├── controllers/
│   │   └── studentController.js # Business logic
│   ├── models/
│   │   └── Student.js           # Mongoose schema
│   ├── routes/
│   │   └── studentRoutes.js     # API route definitions
│   ├── server.js                # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🛠️ Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v16+ | https://nodejs.org |
| npm | v8+ | (comes with Node.js) |
| MongoDB | v6+ | https://www.mongodb.com/try/download/community |

---

## 🚀 Setup & Run Locally

### Step 1: Clone / Download the project

```bash
cd student-registration
```

### Step 2: Set up the Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env

# Edit .env if needed (defaults work for local MongoDB)
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/student_registration
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Ubuntu/Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B - MongoDB Atlas (Cloud):**
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Get your connection string
4. Update `MONGO_URI` in `backend/.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/student_registration
```

### Step 4: Start the Backend Server

```bash
# From the /backend directory
npm run dev       # Development (with auto-restart via nodemon)
# OR
npm start         # Production
```

✅ Backend running at: `http://localhost:5000`

### Step 5: Set up the Frontend

```bash
# Open a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

✅ Frontend running at: `http://localhost:3000`

---

## 🔌 API Reference

### Base URL: `http://localhost:5000/api`

#### `POST /register`
Register a new student with all details.

**Request Body:**
```json
{
  "fullName": "Rahul Sharma",
  "collegeBranch": "CSE",
  "mobileNumber": "9876543210",
  "gender": "Male",
  "location": "Hyderabad, Telangana",
  "alternativeContact": "",
  "bachelorsTechBranch": "Computer Science",
  "interestedTechnologies": ["Cloud Computing", "Machine Learning"],
  "techStackExperience": ["Python", "JavaScript", "React"],
  "careerGoal": "Become a Cloud Architect"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Student registered successfully!",
  "data": {
    "_id": "...",
    "fullName": "Rahul Sharma",
    ...
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Mobile number must be exactly 10 digits"]
}
```

#### `GET /students`
Retrieve all registered students (admin use).

---

## 📋 MongoDB Schema

```javascript
{
  // Personal Info
  fullName:           String (required, 2-100 chars)
  collegeBranch:      Enum ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'IT']
  mobileNumber:       String (required, 10 digits)
  gender:             Enum ['Male', 'Female', 'Other']
  location:           String (required)
  alternativeContact: String (optional, 10 digits)

  // Tech Interests
  bachelorsTechBranch:    Enum ['Computer Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil']
  interestedTechnologies: [String] (min 1 required)
  techStackExperience:    [String] (optional)
  careerGoal:             String (required, max 500 chars)

  // Auto-generated
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔧 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student_registration
```

### Frontend `.env` (optional)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|---------|
| `MongoServerError: connect ECONNREFUSED` | MongoDB is not running. Start it with `brew services start mongodb-community` or `sudo systemctl start mongod` |
| `CORS error in browser` | Make sure backend is running on port 5000 and frontend proxy is set in `package.json` |
| `Port 3000 already in use` | Kill the process: `lsof -ti:3000 \| xargs kill` |
| `Port 5000 already in use` | Kill the process: `lsof -ti:5000 \| xargs kill` |
| `Module not found` | Run `npm install` in both `/frontend` and `/backend` directories |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Hooks |
| Styling | Pure CSS with CSS Variables (no extra framework needed) |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Dev Tools | nodemon |

---

## 📁 Quick Start (One-liner)

```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm start
```

Then open **http://localhost:3000** in your browser. 🎉
