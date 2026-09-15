import React, { useState } from 'react';
import { Reorder, motion } from 'framer-motion';
import AnimatedButton from './ui/AnimatedButton';
import { Plus, Trash2, GripVertical, CheckCircle } from 'lucide-react';

export default function EditorForm({ data, updatePersonalInfo, setFullData }) {
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    updatePersonalInfo(e.target.name, e.target.value);
  };

  const handleAddExp = () => {
    setFullData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: '', role: '', period: '', description: '' }]
    }));
  };

  const handleExpChange = (id, field, value) => {
    setFullData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      const currentSkills = data.skills ? data.skills.split(',').map(s => s.trim()) : [];
      if (!currentSkills.includes(skillInput.trim())) {
        currentSkills.push(skillInput.trim());
        setFullData(p => ({ ...p, skills: currentSkills.join(', ') }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    const currentSkills = data.skills.split(',').map(s => s.trim());
    setFullData(p => ({ ...p, skills: currentSkills.filter(s => s !== skillToRemove).join(', ') }));
  };

  const handleReorder = (newOrder) => {
    setFullData(p => ({ ...p, experience: newOrder }));
  };

  // Calcular progreso (basic check)
  const calculateProgress = () => {
    let score = 0;
    const { personalInfo, experience, skills } = data;
    if (personalInfo.fullName) score += 20;
    if (personalInfo.jobTitle) score += 10;
    if (personalInfo.email) score += 10;
    if (personalInfo.phone) score += 10;
    if (personalInfo.summary) score += 20;
    if (experience.length > 0) score += 20;
    if (skills) score += 10;
    return score;
  };
  const progress = calculateProgress();

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Progress Bar */}
      <div style={{ background: 'var(--input-bg)', padding: '12px', borderRadius: '8px', border: '1px solid var(--input-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>CV Completo</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>{progress}%</span>
        </div>
        <div style={{ height: '8px', background: 'var(--bg-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%', background: progress === 100 ? '#10b981' : 'var(--primary)' }}
          />
        </div>
      </div>

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
          <h3 style={{ color: 'var(--primary)', margin: 0 }}>Experiencia (Drag & Drop)</h3>
          <AnimatedButton onClick={handleAddExp} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} icon={Plus}>Añadir</AnimatedButton>
        </div>
        
        <Reorder.Group axis="y" values={data.experience} onReorder={handleReorder} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {data.experience.map(exp => (
            <Reorder.Item 
              key={exp.id} 
              value={exp}
              style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '8px', marginBottom: '16px', position: 'relative', border: '1px solid var(--input-border)', cursor: 'grab' }}
            >
              <div style={{ position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.5 }}>
                <GripVertical size={20} />
              </div>
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
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>
      
      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Habilidades</h3>
        <div className="input-group">
          <label>Escribe una habilidad y presiona Enter</label>
          <input 
            value={skillInput} 
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={addSkill}
            placeholder="React, JavaScript, Liderazgo..."
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {data.skills && data.skills.split(',').map((s, idx) => s.trim() ? (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              key={idx} 
              style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {s.trim()}
              <button onClick={() => removeSkill(s.trim())} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}>
                <Trash2 size={12} />
              </button>
            </motion.div>
          ) : null)}
        </div>
      </section>
    </div>
  );
}
