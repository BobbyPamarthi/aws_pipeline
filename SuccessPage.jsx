import React from 'react';

const Field = ({ label, value }) => (
  <div className="summary-item">
    <span className="summary-key">{label}</span>
    <span className="summary-value">{value || '—'}</span>
  </div>
);

const SuccessPage = ({ data, onReset }) => {
  if (!data) return null;

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="success-banner">
          <div className="success-icon">✓</div>
          <h1>Registration Successful!</h1>
          <p>Your details have been saved. Here's a summary of your submission.</p>
        </div>

        <div className="summary-body">
          <div className="summary-section">
            <div className="summary-section-title">👤 Personal Information</div>
            <div className="summary-grid">
              <Field label="Full Name" value={data.fullName} />
              <Field label="College Branch" value={data.collegeBranch} />
              <Field label="Mobile Number" value={data.mobileNumber} />
              <Field label="Gender" value={data.gender} />
              <Field label="Location" value={data.location} />
              {data.alternativeContact && (
                <Field label="Alt. Contact" value={data.alternativeContact} />
              )}
            </div>
          </div>

          <div className="summary-section">
            <div className="summary-section-title">🎓 Academic Background</div>
            <div className="summary-grid">
              <Field label="Bachelor's Branch" value={data.bachelorsTechBranch} />
            </div>
          </div>

          <div className="summary-section">
            <div className="summary-section-title">💡 Technology Interests</div>
            <div className="tag-list">
              {data.interestedTechnologies?.map((t) => (
                <span key={t} className="tag tech">{t}</span>
              ))}
            </div>
          </div>

          {data.techStackExperience?.length > 0 && (
            <div className="summary-section">
              <div className="summary-section-title">🛠️ Tech Stack Experience</div>
              <div className="tag-list">
                {data.techStackExperience.map((t) => (
                  <span key={t} className="tag stack">{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="summary-section">
            <div className="summary-section-title">🎯 Career Goal</div>
            <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic', padding: '12px 16px', background: 'var(--surface)', borderRadius: 10, borderLeft: '3px solid var(--accent)' }}>
              "{data.careerGoal}"
            </p>
          </div>

          {data._id && (
            <div style={{ marginTop: 8, padding: '10px 14px', background: 'rgba(0,185,107,0.06)', border: '1px solid rgba(0,185,107,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>✅</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Registration ID</div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontFamily: 'monospace' }}>{data._id}</div>
              </div>
            </div>
          )}
        </div>

        <div className="success-actions">
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print Summary
          </button>
          <button className="btn btn-primary" onClick={onReset}>
            Register Another Student
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
