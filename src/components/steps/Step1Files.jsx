import React from 'react';

export default function Step1Files({ currentStep, formData, dropRef, handleFiles, removeFile, skipStep, nextStep }) {
  return (
    <div className={`form-container form-step ${currentStep === 1 ? 'active' : ''}`}>
      <div className="form-header">
        <h2>📁 Загрузка материалов</h2>
      </div>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Для более точной оценки и понимания задачи, загрузите имеющиеся материалы</label>
          <div className="file-drop-zone" ref={dropRef} onClick={() => document.getElementById('tzFileInput').click()}>
            <div className="upload-icon">📤</div>
            <h3>Перетащите файлы сюда</h3>
            <p>или</p>
            <button type="button" className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); document.getElementById('tzFileInput').click(); }}>Выберите файлы</button>
            <input id="tzFileInput" className="file-input" type="file" multiple onChange={(e) => handleFiles(Array.from(e.target.files || []))} />
            <p style={{ marginTop: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Поддерживаются: PDF, JPG, PNG, DWG, DOC до 50 МБ</p>
          </div>
          <div className="file-list">
            {formData.files.map((file) => (
              <div key={file.name} className="file-item">
                <div>
                  <strong>{file.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <button type="button" onClick={() => removeFile(file.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}>✕</button>
              </div>
            ))}
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={skipStep}>Пропустить</button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>Далее →</button>
        </div>
      </div>
    </div>
  );
}


