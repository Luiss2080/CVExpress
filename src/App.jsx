import React, { useState, useRef } from 'react';
import { useCVData } from './hooks/useCVData';
import EditorForm from './components/EditorForm';
import CVPreview from './components/CVPreview';
import AnimatedButton from './components/ui/AnimatedButton';
import Modal from './components/ui/Modal';
import { Settings, Download, Moon, Sun, LayoutTemplate, HelpCircle } from 'lucide-react';
import html2pdf from 'html2pdf.js';

function App() {
  const { data, updatePersonalInfo, setFullData } = useCVData();
  const [theme, setTheme] = useState('light');
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [layout, setLayout] = useState('classic');
  const cvRef = useRef(null);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleDownloadPDF = () => {
    const element = cvRef.current;
    if (!element) return;
    const opt = {
      margin:       0,
      filename:     `${data.personalInfo.fullName || 'mi'}_CV.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cv_data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      {/* Editor / Sidebar */}
      <div className="editor-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>Generador CV Pro</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <AnimatedButton onClick={toggleTheme} variant="secondary" style={{ padding: '8px' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </AnimatedButton>
            <AnimatedButton onClick={() => setSettingsOpen(true)} variant="secondary" style={{ padding: '8px' }}>
              <Settings size={20} />
            </AnimatedButton>
          </div>
        </div>
        
        <EditorForm 
          data={data} 
          updatePersonalInfo={updatePersonalInfo} 
          setFullData={setFullData}
        />
        
        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '20px' }}>
           <AnimatedButton onClick={handleDownloadPDF} icon={Download} style={{ flex: 1 }}>
             Descargar PDF
           </AnimatedButton>
        </div>
      </div>

      {/* Preview Section */}
      <div className="preview-section glass-panel">
        <CVPreview data={data} layout={layout} cvRef={cvRef} />
      </div>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} title="Configuración Avanzada">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Plantilla del CV</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <AnimatedButton variant={layout === 'classic' ? 'primary' : 'secondary'} onClick={() => setLayout('classic')} icon={LayoutTemplate}>Clásico</AnimatedButton>
              <AnimatedButton variant={layout === 'modern' ? 'primary' : 'secondary'} onClick={() => setLayout('modern')} icon={LayoutTemplate}>Moderno (Próximamente)</AnimatedButton>
            </div>
          </div>
          <div>
             <label style={{ display: 'block', marginBottom: '8px' }}>Datos</label>
             <div style={{ display: 'flex', gap: '8px' }}>
               <AnimatedButton onClick={exportJSON} variant="secondary">Exportar JSON</AnimatedButton>
             </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
