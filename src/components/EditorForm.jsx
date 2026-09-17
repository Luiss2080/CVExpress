import React, { useState } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from './ui/AnimatedButton';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

export default function EditorForm({ data, updatePersonalInfo, updateSettings, setFullData }) {
  const [activeTab, setActiveTab] = useState('personal');
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

  const handleAddEdu = () => {
    setFullData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), institution: '', degree: '', year: '' }]
    }));
  };

  const handleExpChange = (id, field, value) => {
    setFullData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const handleEduChange = (id, field, value) => {
    setFullData(prev => ({
      ...prev,
      education: prev.education.map(ed => ed.id === id ? { ...ed, [field]: value } : ed)
    }));
  };

  const moveItem = (listKey, id, direction) => {
    setFullData(prev => {
      const list = prev[listKey];
      const index = list.findIndex(item => item.id === id);
      const targetIndex = index + direction;
      if (index === -1 || targetIndex < 0 || targetIndex >= list.length) return prev;
      const newList = [...list];
      [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
      return { ...prev, [listKey]: newList };
    });
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

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'education', label: 'Educación & Más' },
    { id: 'design', label: 'Diseño' },
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '600px' }}>
      
      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--input-border)', paddingBottom: '10px', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-color)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {activeTab === 'personal' && (
            <section>
              <div className="input-group">
                <label htmlFor="cv-fullName">Nombre Completo</label>
                <input id="cv-fullName" name="fullName" value={data.personalInfo.fullName} onChange={handleChange} placeholder="Ej. Juan Pérez" />
              </div>
              <div className="input-group">
                <label htmlFor="cv-jobTitle">Título Profesional</label>
                <input id="cv-jobTitle" name="jobTitle" value={data.personalInfo.jobTitle} onChange={handleChange} placeholder="Ej. Desarrollador Frontend" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label htmlFor="cv-email">Email</label>
                  <input id="cv-email" name="email" value={data.personalInfo.email} onChange={handleChange} placeholder="tu@email.com" />
                </div>
                <div className="input-group">
                  <label htmlFor="cv-phone">Teléfono</label>
                  <input id="cv-phone" name="phone" value={data.personalInfo.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="cv-summary">Resumen</label>
                <textarea id="cv-summary" name="summary" value={data.personalInfo.summary} onChange={handleChange} rows="4" placeholder="Breve descripción sobre ti..." />
              </div>
            </section>
          )}

          {activeTab === 'experience' && (
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ fontSize: '1rem', fontWeight: 'bold' }}>Experiencia Laboral (arrastra o usa las flechas para reordenar)</label>
                <AnimatedButton onClick={handleAddExp} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} icon={Plus}>Añadir</AnimatedButton>
              </div>
              
              <Reorder.Group axis="y" values={data.experience} onReorder={val => setFullData(p => ({...p, experience: val}))} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {data.experience.map((exp, index) => (
                  <Reorder.Item
                    key={exp.id}
                    value={exp}
                    style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '8px', marginBottom: '16px', position: 'relative', border: '1px solid var(--input-border)', cursor: 'grab' }}
                  >
                    <div style={{ position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.5 }} aria-hidden="true">
                      <GripVertical size={20} />
                    </div>
                    <div style={{ position: 'absolute', top: '10px', right: '44px', display: 'flex', flexDirection: 'column' }}>
                      <button
                        type="button"
                        onClick={() => moveItem('experience', exp.id, -1)}
                        disabled={index === 0}
                        aria-label="Mover experiencia hacia arriba"
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 0.7, padding: '2px' }}
                      >
                        <ChevronUp size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem('experience', exp.id, 1)}
                        disabled={index === data.experience.length - 1}
                        aria-label="Mover experiencia hacia abajo"
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: index === data.experience.length - 1 ? 'default' : 'pointer', opacity: index === data.experience.length - 1 ? 0.3 : 0.7, padding: '2px' }}
                      >
                        <ChevronDown size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="input-group">
                       <label htmlFor={`exp-company-${exp.id}`}>Empresa</label>
                       <input id={`exp-company-${exp.id}`} value={exp.company} onChange={e => handleExpChange(exp.id, 'company', e.target.value)} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="input-group">
                         <label htmlFor={`exp-role-${exp.id}`}>Cargo</label>
                         <input id={`exp-role-${exp.id}`} value={exp.role} onChange={e => handleExpChange(exp.id, 'role', e.target.value)} />
                      </div>
                      <div className="input-group">
                         <label htmlFor={`exp-period-${exp.id}`}>Periodo (Ej. 2020 - 2023)</label>
                         <input id={`exp-period-${exp.id}`} value={exp.period || ''} onChange={e => handleExpChange(exp.id, 'period', e.target.value)} />
                      </div>
                    </div>
                    <div className="input-group">
                       <label htmlFor={`exp-description-${exp.id}`}>Descripción</label>
                       <textarea id={`exp-description-${exp.id}`} value={exp.description} onChange={e => handleExpChange(exp.id, 'description', e.target.value)} rows="2" />
                    </div>
                    <button
                      onClick={() => setFullData(p => ({...p, experience: p.experience.filter(e => e.id !== exp.id)}))}
                      aria-label={`Eliminar experiencia${exp.role ? `: ${exp.role}` : ''}`}
                      style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </section>
          )}

          {activeTab === 'education' && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label style={{ fontSize: '1rem', fontWeight: 'bold' }}>Educación</label>
                  <AnimatedButton onClick={handleAddEdu} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} icon={Plus}>Añadir</AnimatedButton>
                </div>
                
                <Reorder.Group axis="y" values={data.education} onReorder={val => setFullData(p => ({...p, education: val}))} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {data.education.map((ed, index) => (
                    <Reorder.Item
                      key={ed.id}
                      value={ed}
                      style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '8px', marginBottom: '16px', position: 'relative', border: '1px solid var(--input-border)', cursor: 'grab' }}
                    >
                      <div style={{ position: 'absolute', top: '10px', right: '44px', display: 'flex', flexDirection: 'column' }}>
                        <button
                          type="button"
                          onClick={() => moveItem('education', ed.id, -1)}
                          disabled={index === 0}
                          aria-label="Mover educación hacia arriba"
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 0.7, padding: '2px' }}
                        >
                          <ChevronUp size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem('education', ed.id, 1)}
                          disabled={index === data.education.length - 1}
                          aria-label="Mover educación hacia abajo"
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: index === data.education.length - 1 ? 'default' : 'pointer', opacity: index === data.education.length - 1 ? 0.3 : 0.7, padding: '2px' }}
                        >
                          <ChevronDown size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="input-group">
                         <label htmlFor={`edu-institution-${ed.id}`}>Institución</label>
                         <input id={`edu-institution-${ed.id}`} value={ed.institution} onChange={e => handleEduChange(ed.id, 'institution', e.target.value)} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="input-group">
                           <label htmlFor={`edu-degree-${ed.id}`}>Título / Carrera</label>
                           <input id={`edu-degree-${ed.id}`} value={ed.degree} onChange={e => handleEduChange(ed.id, 'degree', e.target.value)} />
                        </div>
                        <div className="input-group">
                           <label htmlFor={`edu-year-${ed.id}`}>Año (Ej. 2022)</label>
                           <input id={`edu-year-${ed.id}`} value={ed.year} onChange={e => handleEduChange(ed.id, 'year', e.target.value)} />
                        </div>
                      </div>
                      <button
                        onClick={() => setFullData(p => ({...p, education: p.education.filter(e => e.id !== ed.id)}))}
                        aria-label={`Eliminar educación${ed.degree ? `: ${ed.degree}` : ''}`}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>

              <div>
                <label htmlFor="cv-skill-input" style={{ fontSize: '1rem', fontWeight: 'bold', display: 'block', marginBottom: '16px' }}>Habilidades Técnicas</label>
                <div className="input-group">
                  <input
                    id="cv-skill-input"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                    placeholder="Escribe una habilidad y presiona Enter..."
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
                      <button onClick={() => removeSkill(s.trim())} aria-label={`Eliminar habilidad: ${s.trim()}`} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}>
                        <Trash2 size={12} aria-hidden="true" />
                      </button>
                    </motion.div>
                  ) : null)}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'design' && (
            <section>
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="cv-themeColor">Color de Acento del CV</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <input
                    id="cv-themeColor"
                    type="color"
                    value={data.settings.themeColor || '#3b82f6'}
                    onChange={e => updateSettings('themeColor', e.target.value)}
                    style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  />
                  <span style={{ fontFamily: 'monospace' }}>{data.settings.themeColor}</span>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="cv-fontFamily">Tipografía del CV</label>
                <select
                  id="cv-fontFamily"
                  value={data.settings.fontFamily || 'sans-serif'}
                  onChange={e => updateSettings('fontFamily', e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px' }}
                >
                  <option value="sans-serif">Moderno (Sans-Serif)</option>
                  <option value="serif">Clásico (Serif)</option>
                  <option value="monospace">Creativo (Monospace)</option>
                </select>
              </div>
            </section>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
