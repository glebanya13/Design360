import React from 'react';

export default function Step3Rooms({ currentStep, formData, setFormData, updateField, prevStep, nextStep }) {
  return (
    <div className={`form-container form-step ${currentStep === 3 ? 'active' : ''}`}>
      <div className="form-header">
        <h2>🚪 Помещения</h2>
      </div>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Выберите помещения для проектирования</label>
          <div className="checkbox-group">
            {[
              ['living-room', 'Гостиная'],
              ['kitchen', 'Кухня'],
              ['bedroom', 'Спальня'],
              ['bathroom', 'Ванная комната'],
              ['toilet', 'Туалет'],
              ['hallway', 'Прихожая'],
              ['balcony', 'Балкон/Лоджия'],
              ['dressing-room', 'Гардеробная'],
              ['office', 'Кабинет'],
              ['children-room', 'Детская комната']
            ].map(([value, label]) => (
              <label key={value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.roomsList.includes(value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => ({
                      ...prev,
                      roomsList: checked
                        ? [...prev.roomsList, value]
                        : prev.roomsList.filter((v) => v !== value)
                    }));
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Особые помещения (если есть)</label>
          <textarea placeholder="Например: библиотека, домашний кинотеатр, спортзал и т.д." style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 8, minHeight: 100 }} value={formData.specialRooms} onChange={(e) => updateField('specialRooms', e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>← Назад</button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>Далее →</button>
        </div>
      </div>
    </div>
  );
}


