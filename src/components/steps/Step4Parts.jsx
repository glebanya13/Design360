import React from 'react';

export default function Step4Parts({ currentStep, formData, setFormData, updateField, prevStep, nextStep }) {
  return (
    <div className={`form-container form-step ${currentStep === 4 ? 'active' : ''}`}>
      <div className="form-header">
        <h2>📐 Состав проекта</h2>
      </div>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Выберите, что должно быть включено в проект</label>
          <div className="checkbox-group">
            {[
              ['planning', 'Планировочное решение'],
              ['concept', 'Концепция интерьера'],
              ['visualization', '3D-визуализация'],
              ['working-docs', 'Рабочая документация'],
              ['furniture', 'Подбор мебели и материалов'],
              ['lighting', 'Проект освещения'],
              ['author-supervision', 'Авторский надзор']
            ].map(([value, label]) => (
              <label key={value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.projectParts.includes(value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => ({
                      ...prev,
                      projectParts: checked
                        ? [...prev.projectParts, value]
                        : prev.projectParts.filter((v) => v !== value)
                    }));
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Особые требования к проекту</label>
          <textarea placeholder="Опишите ваши пожелания и особенности проекта..." style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 8, minHeight: 120 }} value={formData.specialRequirements} onChange={(e) => updateField('specialRequirements', e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>← Назад</button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>Далее →</button>
        </div>
      </div>
    </div>
  );
}


