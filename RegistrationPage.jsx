import React, { useState } from 'react';
import InputField from '../components/InputField';
import StepIndicator from '../components/StepIndicator';

const BRANCHES = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'IT'];
const GENDERS = ['Male', 'Female', 'Other'];

const validate = (data) => {
  const errs = {};
  if (!data.fullName.trim()) errs.fullName = 'Full name is required';
  else if (data.fullName.trim().length < 2) errs.fullName = 'Name must be at least 2 characters';
  if (!data.collegeBranch) errs.collegeBranch = 'Please select your branch';
  if (!data.mobileNumber) errs.mobileNumber = 'Mobile number is required';
  else if (!/^\d{10}$/.test(data.mobileNumber)) errs.mobileNumber = 'Enter a valid 10-digit mobile number';
  if (!data.gender) errs.gender = 'Please select your gender';
  if (!data.location.trim()) errs.location = 'Location is required';
  if (data.alternativeContact && !/^\d{10}$/.test(data.alternativeContact))
    errs.alternativeContact = 'Enter a valid 10-digit number';
  return errs;
};

const RegistrationPage = ({ initialData, onNext }) => {
  const [form, setForm] = useState({
    fullName: initialData.fullName || '',
    collegeBranch: initialData.collegeBranch || '',
    mobileNumber: initialData.mobileNumber || '',
    gender: initialData.gender || '',
    location: initialData.location || '',
    alternativeContact: initialData.alternativeContact || '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: e.target.value });
      setErrors((p) => ({ ...p, [field]: newErrors[field] }));
    }
  };

  const blur = (field) => () => {
    setTouched((p) => ({ ...p, [field]: true }));
    const newErrors = validate(form);
    setErrors((p) => ({ ...p, [field]: newErrors[field] }));
  };

  const handleNext = () => {
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext(form);
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <div className="page-header">
          <div className="brand-badge"><span className="dot" />Student Portal</div>
          <h1 className="page-title">Tell us about <span>yourself</span></h1>
          <p className="page-subtitle">Fill in your personal details to get started</p>
        </div>

        <StepIndicator current={1} />

        <div className="form-card">
          <div className="form-card-header">
            <div className="form-card-icon">👤</div>
            <div>
              <div className="form-card-title">Personal Information</div>
              <div className="form-card-desc">All fields marked with * are required</div>
            </div>
          </div>

          <div className="form-body">
            <div className="form-grid">

              <InputField label="Full Name" required error={touched.fullName && errors.fullName} className="full-width">
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.fullName}
                  onChange={set('fullName')}
                  onBlur={blur('fullName')}
                  className={touched.fullName && errors.fullName ? 'error' : ''}
                />
              </InputField>

              <InputField label="College Branch" required error={touched.collegeBranch && errors.collegeBranch}>
                <select
                  value={form.collegeBranch}
                  onChange={set('collegeBranch')}
                  onBlur={blur('collegeBranch')}
                  className={touched.collegeBranch && errors.collegeBranch ? 'error' : ''}
                >
                  <option value="">Select branch</option>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </InputField>

              <InputField label="Mobile Number" required error={touched.mobileNumber && errors.mobileNumber}>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={form.mobileNumber}
                  onChange={(e) => { set('mobileNumber')({ target: { value: e.target.value.replace(/\D/g, '').slice(0, 10) } }); }}
                  onBlur={blur('mobileNumber')}
                  className={touched.mobileNumber && errors.mobileNumber ? 'error' : ''}
                  maxLength={10}
                />
              </InputField>

              <InputField label="Location" required error={touched.location && errors.location}>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad, Telangana"
                  value={form.location}
                  onChange={set('location')}
                  onBlur={blur('location')}
                  className={touched.location && errors.location ? 'error' : ''}
                />
              </InputField>

              <InputField label="Gender" required error={touched.gender && errors.gender} className="full-width">
                <div className="radio-group">
                  {GENDERS.map((g) => (
                    <label key={g} className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={form.gender === g}
                        onChange={set('gender')}
                        onBlur={blur('gender')}
                      />
                      <span className="radio-dot" />
                      {g}
                    </label>
                  ))}
                </div>
              </InputField>

              <InputField label="Alternative Contact" optional error={touched.alternativeContact && errors.alternativeContact} className="full-width">
                <input
                  type="tel"
                  placeholder="10-digit number (optional)"
                  value={form.alternativeContact}
                  onChange={(e) => { set('alternativeContact')({ target: { value: e.target.value.replace(/\D/g, '').slice(0, 10) } }); }}
                  onBlur={blur('alternativeContact')}
                  className={touched.alternativeContact && errors.alternativeContact ? 'error' : ''}
                  maxLength={10}
                />
              </InputField>

            </div>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleNext}>
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
