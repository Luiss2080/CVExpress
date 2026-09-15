import React from 'react';
import LayoutClassic from '../layouts/LayoutClassic';

export default function CVPreview({ data, layout, cvRef }) {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div 
        ref={cvRef}
        style={{ 
          width: '210mm',
          transform: 'scale(0.85)', 
          transformOrigin: 'top center'
        }}
      >
        {layout === 'classic' && <LayoutClassic data={data} />}
        {/* Futuros layouts se agregarán aquí */}
      </div>
    </div>
  );
}
