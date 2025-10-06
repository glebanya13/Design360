import React from 'react';

export default function Step5Style({ currentStep, formData, updateField, budgetMap, prevStep, nextStep }) {
  return (
    <div className={`form-container form-step ${currentStep === 5 ? 'active' : ''}`}>
      <div className="form-header">
        <h2>🎨 Стиль и бюджет</h2>
      </div>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Предпочтительный стиль интерьера</label>
          <div className="options-grid">
            {[
              ['warm-minimalism', '✨', 'Теплый минимализм'],
              ['urban-loft', '🏭', 'Урбан-лофт'],
              ['scandinavian', '🌲', 'Скандинавский'],
              ['japanese', '🎋', 'Японский минимализм'],
              ['industrial-light', '⚙️', 'Индастриал-лайт'],
              ['modern-kitsch', '🌈', 'Современный китч']
            ].map(([value, icon, label]) => (
              <div key={value} className={`option-card ${formData.preferredStyle === value ? 'selected' : ''}`} onClick={() => updateField('preferredStyle', value)}>
                <div className="option-icon">{icon}</div>
                <div>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Цветовые предпочтения</label>
          <input type="text" placeholder="Например: светлые тона, натуральные материалы, пастельная гамма" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 8 }} value={formData.colorPreferences} onChange={(e) => updateField('colorPreferences', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Примерный бюджет на реализацию (руб.)</label>
          <div className="budget-options">
            {['100-300', '300-500', '500-800', '800-1200', '1200+'].map((value) => (
              <div key={value} className={`budget-option ${formData.budget === value ? 'selected' : ''}`} onClick={() => updateField('budget', value)}>
                <div>{budgetMap[value].replace(' руб.', '').replace(' тыс.', ' тыс.').replace(' млн+', ' млн+')}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>← Назад</button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>Далее →</button>
        </div>
      </div>
    </div>
  );
}


