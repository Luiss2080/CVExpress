import React from 'react';
import LayoutClassic from '../layouts/LayoutClassic';
import LayoutModern from '../layouts/LayoutModern';

export default function CVPreview({ data, layout, cvRef }) {
  return (
    <div className="cv-preview-outer">
      {/* The on-screen zoom-out lives on this wrapper, not on the ref'd
          node below, so html2pdf/html2canvas always captures the CV at
          its true, untransformed size regardless of on-screen zoom. */}
      <div className="cv-preview-scale">
        <div ref={cvRef} className="cv-page" style={{ width: '210mm' }}>
          {layout === 'classic' && <LayoutClassic data={data} />}
          {layout === 'modern' && <LayoutModern data={data} />}
        </div>
      </div>
    </div>
  );
}
