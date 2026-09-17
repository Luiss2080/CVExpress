import React from 'react';
import { parseSkills } from '../utils/skills';

export default function LayoutClassic({ data }) {
  const { personalInfo, experience, education, skills, settings } = data;
  const color = settings?.themeColor || '#3b82f6';
  const font = settings?.fontFamily || 'sans-serif';

  return (
    <div style={{
      width: '100%',
      minHeight: '297mm',
      background: 'white',
      color: '#111',
      padding: '40px',
      fontFamily: font,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '4px'
    }}>
      <header style={{ borderBottom: `3px solid ${color}`, paddingBottom: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', textTransform: 'uppercase', color: '#111' }}>{personalInfo.fullName || 'Tu Nombre'}</h1>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '400', margin: '0 0 10px 0', color: color }}>{personalInfo.jobTitle || 'Título Profesional'}</h2>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          {personalInfo.email} {personalInfo.phone && `• ${personalInfo.phone}`}
        </div>
      </header>

      {personalInfo.summary && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '4px', color: color }}>PERFIL</h3>
          <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>{personalInfo.summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '4px', color: color }}>EXPERIENCIA</h3>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ margin: '0', fontSize: '1.05rem', fontWeight: 'bold' }}>{exp.role}</h4>
                {exp.period && <span style={{ fontSize: '0.85rem', color: color, fontWeight: 'bold' }}>{exp.period}</span>}
              </div>
              <div style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#555', marginBottom: '4px' }}>{exp.company}</div>
              <p style={{ marginTop: '4px', fontSize: '0.95rem', lineHeight: '1.5', color: '#333' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '4px', color: color }}>EDUCACIÓN</h3>
          {education.map(ed => (
            <div key={ed.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ margin: '0', fontSize: '1.05rem', fontWeight: 'bold' }}>{ed.degree}</h4>
                {ed.year && <span style={{ fontSize: '0.85rem', color: color }}>{ed.year}</span>}
              </div>
              <div style={{ fontSize: '0.95rem', color: '#555' }}>{ed.institution}</div>
            </div>
          ))}
        </section>
      )}

      {skills && (
        <section>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '4px', color: color }}>HABILIDADES</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {parseSkills(skills).map((s) => (
              <span key={s} style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '4px', fontSize: '0.9rem', color: '#334155' }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
