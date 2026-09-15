import React from 'react';

export default function LayoutModern({ data }) {
  const { personalInfo, experience, education, skills, settings } = data;
  const color = settings?.themeColor || '#3b82f6';
  const font = settings?.fontFamily || 'sans-serif';

  return (
    <div style={{
      width: '100%',
      minHeight: '297mm',
      background: 'white',
      color: '#333',
      fontFamily: font,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden'
    }}>
      {/* Sidebar Left */}
      <div style={{ width: '35%', background: color, color: 'white', padding: '40px 30px' }}>
        <h1 style={{ fontSize: '2.2rem', margin: '0 0 5px 0', textTransform: 'uppercase', lineHeight: '1.1' }}>{personalInfo.fullName || 'Tu Nombre'}</h1>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '400', margin: '0 0 30px 0', opacity: 0.9 }}>{personalInfo.jobTitle || 'Título Profesional'}</h2>
        
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.3)', marginBottom: '15px', paddingBottom: '5px' }}>Contacto</h3>
          <div style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{personalInfo.email}</div>
          <div style={{ fontSize: '0.9rem' }}>{personalInfo.phone}</div>
        </div>

        {skills && (
          <div>
            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.3)', marginBottom: '15px', paddingBottom: '5px' }}>Habilidades</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', lineHeight: '1.8' }}>
              {skills.split(',').map((s, idx) => s.trim() ? (
                <li key={idx} style={{ background: 'rgba(0,0,0,0.15)', padding: '4px 10px', borderRadius: '4px', marginBottom: '8px', display: 'inline-block', marginRight: '6px' }}>{s.trim()}</li>
              ) : null)}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content Right */}
      <div style={{ width: '65%', padding: '40px 40px', background: '#fafafa' }}>
        {personalInfo.summary && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', color: color, textTransform: 'uppercase', marginBottom: '10px' }}>Perfil Profesional</h3>
            <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: '#555' }}>{personalInfo.summary}</p>
          </section>
        )}

        {experience && experience.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', color: color, textTransform: 'uppercase', marginBottom: '15px' }}>Experiencia</h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '15px', borderLeft: `2px solid ${color}40` }}>
                <div style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: color, left: '-5px', top: '5px' }}></div>
                <h4 style={{ margin: '0', fontSize: '1.1rem', color: '#222' }}>{exp.role}</h4>
                <div style={{ fontSize: '0.9rem', color: color, fontWeight: 'bold', margin: '4px 0' }}>{exp.company} {exp.period && `| ${exp.period}`}</div>
                <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.5', color: '#555' }}>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {education && education.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', color: color, textTransform: 'uppercase', marginBottom: '15px' }}>Educación</h3>
            {education.map(ed => (
              <div key={ed.id} style={{ marginBottom: '15px' }}>
                <h4 style={{ margin: '0', fontSize: '1.05rem', color: '#222' }}>{ed.degree}</h4>
                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '2px' }}>{ed.institution} {ed.year && `(${ed.year})`}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
