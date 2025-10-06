import React from 'react';

export default function Step6Summary({ currentStep, formData, typeMap, styleMap, budgetMap, prevStep, submitForm, isSubmitting }) {
  return (
    <div className={`form-container form-step ${currentStep === 6 ? 'active' : ''}`}>
      <div className="form-header">
        <h2>📊 Сводка и контакты</h2>
      </div>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Проверьте введенные данные</label>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-label">Тип объекта</div>
              <div className="summary-value">{typeMap[formData.objectType] || '—'}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Площадь</div>
              <div className="summary-value">{formData.area ? `${formData.area} м²` : '—'}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Комнат</div>
              <div className="summary-value">{formData.rooms || '—'}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Стиль</div>
              <div className="summary-value">{styleMap[formData.preferredStyle] || '—'}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Бюджет</div>
              <div className="summary-value">{budgetMap[formData.budget] || '—'}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Срок реализации</div>
              <div className="summary-value">2-3 месяца</div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3 style={{ marginBottom: '1.5rem' }}>Контактная информация</h3>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="clientName">Ваше ФИО *</label>
              <input id="clientName" type="text" placeholder="Иванов Иван Иванович" value={formData.clientName} onChange={(e) => formData.updateField('clientName', e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="clientPhone">Контактный телефон *</label>
              <input id="clientPhone" type="tel" placeholder="+7 (999) 123-45-67" value={formData.clientPhone} onChange={(e) => formData.updateField('clientPhone', e.target.value)} required />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="clientEmail">Email *</label>
            <input id="clientEmail" type="email" placeholder="example@mail.ru" value={formData.clientEmail} onChange={(e) => formData.updateField('clientEmail', e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="objectAddress">Адрес объекта (если известен)</label>
            <input id="objectAddress" type="text" placeholder="г. Москва, ул. Примерная, д. 1" value={formData.objectAddress} onChange={(e) => formData.updateField('objectAddress', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="additionalInfo">Дополнительная информация</label>
            <textarea id="additionalInfo" placeholder="Любая дополнительная информация, которую считаете важной" value={formData.additionalInfo} onChange={(e) => formData.updateField('additionalInfo', e.target.value)} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>← Назад</button>
          <button type="button" className="btn btn-primary" onClick={submitForm} disabled={isSubmitting}>{isSubmitting ? 'Отправка…' : 'Отправить ТЗ'}</button>
        </div>
      </div>
    </div>
  );
}


