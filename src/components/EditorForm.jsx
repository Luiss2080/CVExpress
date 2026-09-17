import React, { useState } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from './ui/AnimatedButton';
import { Plus, Trash2, GripVertical, CheckCircle } from 'lucide-react';
import { parseSkills, addSkillToString, removeSkillFromString } from '../utils/skills';

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

  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      setFullData(p => ({ ...p, skills: addSkillToString(p.skills, skillInput) }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFullData(p => ({ ...p, skills: removeSkillFromString(p.skills, skillToRemove) }));
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
          )}

          {activeTab === 'experience' && (
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ fontSize: '1rem', fontWeight: 'bold' }}>Experiencia Laboral (Arrastra para reordenar)</label>
                <AnimatedButton onClick={handleAddExp} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} icon={Plus}>Añadir</AnimatedButton>
              </div>
              
              <Reorder.Group axis="y" values={data.experience} onReorder={val => setFullData(p => ({...p, experience: val}))} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="input-group">
                         <label>Cargo</label>
                         <input value={exp.role} onChange={e => handleExpChange(exp.id, 'role', e.target.value)} />
                      </div>
                      <div className="input-group">
                         <label>Periodo (Ej. 2020 - 2023)</label>
                         <input value={exp.period || ''} onChange={e => handleExpChange(exp.id, 'period', e.target.value)} />
                      </div>
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
          )}

          {activeTab === 'education' && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label style={{ fontSize: '1rem', fontWeight: 'bold' }}>Educación</label>
                  <AnimatedButton onClick={handleAddEdu} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} icon={Plus}>Añadir</AnimatedButton>
                </div>
                
                <Reorder.Group axis="y" values={data.education} onReorder={val => setFullData(p => ({...p, education: val}))} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {data.education.map(ed => (
                    <Reorder.Item 
                      key={ed.id} 
                      value={ed}
                      style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '8px', marginBottom: '16px', position: 'relative', border: '1px solid var(--input-border)', cursor: 'grab' }}
                    >
                      <div className="input-group">
                         <label>Institución</label>
                         <input value={ed.institution} onChange={e => handleEduChange(ed.id, 'institution', e.target.value)} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="input-group">
                           <label>Título / Carrera</label>
                           <input value={ed.degree} onChange={e => handleEduChange(ed.id, 'degree', e.target.value)} />
                        </div>
                        <div className="input-group">
                           <label>Año (Ej. 2022)</label>
                           <input value={ed.year} onChange={e => handleEduChange(ed.id, 'year', e.target.value)} />
                        </div>
                      </div>
                      <button onClick={() => setFullData(p => ({...p, education: p.education.filter(e => e.id !== ed.id)}))} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>

              <div>
                <label style={{ fontSize: '1rem', fontWeight: 'bold', display: 'block', marginBottom: '16px' }}>Habilidades Técnicas</label>
                <div className="input-group">
                  <input 
                    value={skillInput} 
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                    placeholder="Escribe una habilidad y presiona Enter..."
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                  {parseSkills(data.skills).map((s) => (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      key={s}
                      style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      {s}
                      <button onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}>
                        <Trash2 size={12} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'design' && (
            <section>
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label>Color de Acento del CV</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <input 
                    type="color" 
                    value={data.settings.themeColor || '#3b82f6'} 
                    onChange={e => updateSettings('themeColor', e.target.value)}
                    style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  />
                  <span style={{ fontFamily: 'monospace' }}>{data.settings.themeColor}</span>
                </div>
              </div>
              <div className="input-group">
                <label>Tipografía del CV</label>
                <select 
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
