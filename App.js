import React, { useState } from 'react';
import RegistrationPage from './pages/RegistrationPage';
import TechInterestPage from './pages/TechInterestPage';
import SuccessPage from './pages/SuccessPage';
import './App.css';

const PAGES = { REGISTRATION: 1, TECH_INTEREST: 2, SUCCESS: 3 };

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.REGISTRATION);
  const [formData, setFormData] = useState({
    // Page 1
    fullName: '', collegeBranch: '', mobileNumber: '',
    gender: '', location: '', alternativeContact: '',
    // Page 2
    bachelorsTechBranch: '', interestedTechnologies: [],
    techStackExperience: [], careerGoal: '',
  });
  const [submittedData, setSubmittedData] = useState(null);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const goToPage2 = (page1Data) => {
    updateFormData(page1Data);
    setCurrentPage(PAGES.TECH_INTEREST);
  };

  const goToPage1 = () => setCurrentPage(PAGES.REGISTRATION);

  const handleSuccess = (data) => {
    setSubmittedData(data);
    setCurrentPage(PAGES.SUCCESS);
  };

  const handleReset = () => {
    setFormData({
      fullName: '', collegeBranch: '', mobileNumber: '',
      gender: '', location: '', alternativeContact: '',
      bachelorsTechBranch: '', interestedTechnologies: [],
      techStackExperience: [], careerGoal: '',
    });
    setSubmittedData(null);
    setCurrentPage(PAGES.REGISTRATION);
  };

  return (
    <div className="app">
      {currentPage === PAGES.REGISTRATION && (
        <RegistrationPage initialData={formData} onNext={goToPage2} />
      )}
      {currentPage === PAGES.TECH_INTEREST && (
        <TechInterestPage initialData={formData} onBack={goToPage1} onSuccess={handleSuccess} />
      )}
      {currentPage === PAGES.SUCCESS && (
        <SuccessPage data={submittedData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
