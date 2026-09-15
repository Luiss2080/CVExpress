import React from 'react';

export default function LayoutClassic({ data }) {
  const { personalInfo, experience, skills } = data;
  
  return (
    <div style={{
      width: '100%',
      minHeight: '297mm', // A4 Format
      background: 'white',
      color: '#111',
      padding: '40px',
      fontFamily: 'serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '4px'
    }}>
      <header style={{ borderBottom: '2px solid #222', paddingBottom: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', textTransform: 'uppercase' }}>{personalInfo.fullName || 'Tu Nombre'}</h1>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '400', margin: '0 0 10px 0', color: '#555' }}>{personalInfo.jobTitle || 'Título Profesional'}</h2>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          {personalInfo.email} {personalInfo.phone && `• ${personalInfo.phone}`}
        </div>
      </header>

      {personalInfo.summary && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '4px' }}>PERFIL</h3>
          <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '4px' }}>EXPERIENCIA</h3>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ margin: '0', fontSize: '1.05rem' }}>{exp.role}</h4>
                <span style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>{exp.company}</span>
              </div>
              <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.5' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {skills && (
        <section>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '4px' }}>HABILIDADES</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            {skills.split(',').map(s => s.trim()).filter(Boolean).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}
