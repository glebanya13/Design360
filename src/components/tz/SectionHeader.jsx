import React from 'react';

export default function SectionHeader({ 
  title, 
  actions = null 
}) {
  return (
    <div className="section-header">
      <div className="section-title">{title}</div>
      {actions && (
        <div className="section-actions">
          {actions}
        </div>
      )}
    </div>
  );
}
