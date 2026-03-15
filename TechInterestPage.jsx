import React, { useState } from 'react';
import InputField from '../components/InputField';
import StepIndicator from '../components/StepIndicator';
import { registerStudent } from '../services/api';

const TECH_BRANCHES = ['Computer Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil'];

const TECHNOLOGIES = [
  'Cloud Computing', 'DevOps', 'Artificial Intelligence',
  'Machine Learning', 'Data Science', 'Full Stack Development',
  'Cyber Security', 'Blockchain',
];

const TECH_STACK = [
  'Python', 'Java', 'JavaScript', 'React', 'Node.js',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const validate = (data) => {
  const errs = {};
  if (!data.bachelorsTechBranch) errs.bachelorsTechBranch = "Please select your bachelor's branch";
  if (data.interestedTechnologies.length === 0) errs.interestedTechnologies = 'Select at least one technology interest';
  if (!data.careerGoal.trim()) errs.careerGoal = 'Career goal is required';
  return errs;
};

const TechInterestPage = ({ initialData, onBack, onSuccess }) => {
  const [form, setForm] = useState({
    bachelorsTechBranch: initialData.bachelorsTechBranch || '',
    interestedTechnologies: initialData.interestedTechnologies || [],
    techStackExperience: initialData.techStackExperience || [],
    careerGoal: initialData.careerGoal || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const toggleArray = (field, value) => {
    setForm((p) => ({
      ...p,
      [field]: p[field].includes(value) ? p[field].filter((v) => v !== value) : [...p[field], value],
    }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setApiError('');
    try {
      const payload = { ...initialData, ...form };
      const result = await registerStudent(payload);
      onSuccess(result.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please check your connection.';
      const details = err.response?.data?.errors;
      setApiError(details ? details.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <div className="page-header">
          <div className="brand-badge"><span className="dot" />Step 2 of 2</div>
          <h1 className="page-title">Your tech <span>interests</span></h1>
          <p className="page-subtitle">Tell us about your academic focus and tech passions</p>
        </div>

        <StepIndicator current={2} />

        <div className="form-card">
          <div className="form-card-header">
            <div className="form-card-icon">💡</div>
            <div>
              <div className="form-card-title">Technology Profile</div>
              <div className="form-card-desc">Help us understand your technical background</div>
            </div>
          </div>

          <div className="form-body">

            <InputField label="Bachelor's Technology Branch" required error={errors.bachelorsTechBranch}>
              <select
                value={form.bachelorsTechBranch}
                onChange={(e) => { setForm((p) => ({ ...p, bachelorsTechBranch: e.target.value })); setErrors((p) => ({ ...p, bachelorsTechBranch: '' })); }}
                className={errors.bachelorsTechBranch ? 'error' : ''}
              >
                <option value="">Select branch</option>
                {TECH_BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </InputField>

            <div className="section-divider">Technology Interests</div>

            <InputField label="Interested Technologies" required error={errors.interestedTechnologies}>
              <div className="checkbox-grid" style={{ marginTop: 8 }}>
                {TECHNOLOGIES.map((tech) => (
                  <label key={tech} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={form.interestedTechnologies.includes(tech)}
                      onChange={() => toggleArray('interestedTechnologies', tech)}
                    />
                    <span className="checkbox-box"><CheckIcon /></span>
                    {tech}
                  </label>
                ))}
              </div>
            </InputField>

            <div className="section-divider">Tech Stack</div>

            <InputField label="Tech Stack Experience" optional>
              <div className="tech-grid" style={{ marginTop: 8 }}>
                {TECH_STACK.map((tech) => (
                  <label key={tech} className="tech-chip">
                    <input
                      type="checkbox"
                      checked={form.techStackExperience.includes(tech)}
                      onChange={() => toggleArray('techStackExperience', tech)}
                    />
                    {tech}
                  </label>
                ))}
              </div>
            </InputField>

            <div className="section-divider">Career Goal</div>

            <InputField label="Career Goal" required error={errors.careerGoal}>
              <textarea
                placeholder={'e.g. "Become a Cloud Architect"\n"AI Research Engineer"\n"Full Stack Developer"'}
                value={form.careerGoal}
                onChange={(e) => { setForm((p) => ({ ...p, careerGoal: e.target.value })); if (errors.careerGoal) setErrors((p) => ({ ...p, careerGoal: '' })); }}
                className={errors.careerGoal ? 'error' : ''}
                rows={4}
              />
            </InputField>

            {apiError && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(229,62,62,0.06)', border: '1px solid rgba(229,62,62,0.2)', borderRadius: 10, color: '#e53e3e', fontSize: 13, fontWeight: 500 }}>
                ⚠️ {apiError}
              </div>
            )}

            <div className="btn-row">
              <button className="btn btn-secondary" onClick={onBack} disabled={loading}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <><span className="spinner" />Submitting...</> : <>Submit Registration <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechInterestPage;
