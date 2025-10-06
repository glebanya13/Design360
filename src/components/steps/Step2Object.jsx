import React from 'react';

export default function Step2Object({ currentStep, formData, updateField, prevStep, nextStep }) {
  return (
    <div className={`form-container form-step ${currentStep === 2 ? 'active' : ''}`}>
      <div className="form-header">
        <h2>🏠 Тип объекта</h2>
      </div>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Выберите тип объекта</label>
          <div className="options-grid">
            {[
              { value: 'apartment', icon: '🏢', label: 'Квартира' },
              { value: 'studio', icon: '🏘️', label: 'Студия' },
              { value: 'house', icon: '🏠', label: 'Частный дом' },
              { value: 'commercial', icon: '🏪', label: 'Коммерция' }
            ].map((opt) => (
              <div key={opt.value} className={`option-card ${formData.objectType === opt.value ? 'selected' : ''}`} onClick={() => updateField('objectType', opt.value)}>
                <div className="option-icon">{opt.icon}</div>
                <div>{opt.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Площадь объекта (м²)</label>
          <input type="number" placeholder="Например: 65" className="input-field" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 8 }} value={formData.area} onChange={(e) => updateField('area', e.target.value)} />
          <div className="form-hint">Укажите общую площадь объекта</div>
        </div>
        <div className="form-group">
          <label className="form-label">Количество комнат</label>
          <input type="number" placeholder="Например: 3" className="input-field" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 8 }} value={formData.rooms} onChange={(e) => updateField('rooms', e.target.value)} />
          <div className="form-hint">Не включая санузлы, кухню, прихожую</div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>← Назад</button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>Далее →</button>
        </div>
      </div>
    </div>
  );
}


