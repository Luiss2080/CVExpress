import React from 'react';
import AnimatedButton from './ui/AnimatedButton';
import { Plus, Trash2 } from 'lucide-react';

export default function EditorForm({ data, updatePersonalInfo, setFullData }) {
  const handleChange = (e) => {
    updatePersonalInfo(e.target.name, e.target.value);
  };

  const handleAddExp = () => {
    setFullData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', role: '', period: '', description: '' }]
    }));
  };

  const handleExpChange = (id, field, value) => {
    setFullData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Información Personal</h3>
        <div className="input-group">
          <label>Nombre Completo</label>
          <input name="fullName" value={data.personalInfo.fullName} onChange={handleChange} placeholder="Ej. Juan Pérez" />
        </div>
        <div className="input-group">
          <label>Título Profesional</label>
          <input name="jobTitle" value={data.personalInfo.jobTitle} onChange={handleChange} placeholder="Ej. Desarrollador Frontend" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="input-group">
            <label>Email</label>
            <input name="email" value={data.personalInfo.email} onChange={handleChange} placeholder="tu@email.com" />
          </div>
          <div className="input-group">
            <label>Teléfono</label>
            <input name="phone" value={data.personalInfo.phone} onChange={handleChange} placeholder="+1 234 567 890" />
          </div>
        </div>
        <div className="input-group">
          <label>Resumen</label>
          <textarea name="summary" value={data.personalInfo.summary} onChange={handleChange} rows="4" placeholder="Breve descripción sobre ti..." />
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: 'var(--primary)', margin: 0 }}>Experiencia</h3>
          <AnimatedButton onClick={handleAddExp} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} icon={Plus}>Añadir</AnimatedButton>
        </div>
        {data.experience.map(exp => (
          <div key={exp.id} style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '8px', marginBottom: '16px', position: 'relative' }}>
             <div className="input-group">
                <label>Empresa</label>
                <input value={exp.company} onChange={e => handleExpChange(exp.id, 'company', e.target.value)} />
             </div>
             <div className="input-group">
                <label>Cargo</label>
                <input value={exp.role} onChange={e => handleExpChange(exp.id, 'role', e.target.value)} />
             </div>
             <div className="input-group">
                <label>Descripción</label>
                <textarea value={exp.description} onChange={e => handleExpChange(exp.id, 'description', e.target.value)} rows="2" />
             </div>
             <button onClick={() => setFullData(p => ({...p, experience: p.experience.filter(e => e.id !== exp.id)}))} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
               <Trash2 size={18} />
             </button>
          </div>
        ))}
      </section>
      
      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Habilidades</h3>
        <div className="input-group">
          <label>Aptitudes (separadas por coma)</label>
          <textarea 
            value={data.skills} 
            onChange={(e) => setFullData(p => ({...p, skills: e.target.value}))}
            rows="3" 
            placeholder="React, JavaScript, Liderazgo..."
          />
        </div>
      </section>
    </div>
  );
}
