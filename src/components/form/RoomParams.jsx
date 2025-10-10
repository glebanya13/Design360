import React from 'react';
import ErrorMessage from './ErrorMessage';

export default function RoomParams({ 
  roomId,
  roomParams, 
  onParamChange, 
  errors = {}, 
  validationAttempts = {},
  isActive = false
}) {
  const handleLengthChange = (value) => {
    onParamChange('length', value);
    // Автоматический расчет площади
    const width = roomParams.width || 0;
    const area = (parseFloat(value) * parseFloat(width)).toFixed(1);
    onParamChange('area', area);
  };

  const handleWidthChange = (value) => {
    onParamChange('width', value);
    // Автоматический расчет площади
    const length = roomParams.length || 0;
    const area = (parseFloat(length) * parseFloat(value)).toFixed(1);
    onParamChange('area', area);
  };

  return (
    <div className="room-params">
      <div className="param-row">
        <div className="param-group">
          <label className="param-label">
            Длина (м) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className={`param-input ${validationAttempts.step3 && errors.length ? 'error' : ''}`}
            id="room-length"
            placeholder="4.5"
            step="0.1"
            min="0.1"
            value={roomParams.length || ''}
            onChange={(e) => handleLengthChange(e.target.value)}
          />
          {validationAttempts.step3 && errors.length && (
            <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {errors.length}
            </div>
          )}
        </div>
        <div className="param-group">
          <label className="param-label">
            Ширина (м) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className={`param-input ${validationAttempts.step3 && errors.width ? 'error' : ''}`}
            id="room-width"
            placeholder="3.2"
            step="0.1"
            min="0.1"
            value={roomParams.width || ''}
            onChange={(e) => handleWidthChange(e.target.value)}
          />
          {validationAttempts.step3 && errors.width && (
            <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {errors.width}
            </div>
          )}
        </div>
      </div>
      
      <div className="param-row">
        <div className="param-group">
          <label className="param-label">
            Высота (м) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className={`param-input ${validationAttempts.step3 && errors.height ? 'error' : ''}`}
            id="room-height"
            placeholder="2.7"
            step="0.1"
            min="0.1"
            value={roomParams.height || ''}
            onChange={(e) => onParamChange('height', e.target.value)}
          />
          {validationAttempts.step3 && errors.height && (
            <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {errors.height}
            </div>
          )}
        </div>
        <div className="param-group">
          <label className="param-label">Площадь (м²)</label>
          <input
            type="number"
            className="param-input"
            id="room-area"
            placeholder="14.4"
            step="0.1"
            readOnly
            value={roomParams.area || ''}
          />
        </div>
      </div>
      
      <div className="param-group">
        <label className="param-label">
          Назначение помещения <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          className={`param-input ${validationAttempts.step3 && errors.purpose ? 'error' : ''}`}
          id="room-purpose"
          placeholder="Жилая комната, кухня, санузел..."
          value={roomParams.purpose || ''}
          onChange={(e) => onParamChange('purpose', e.target.value)}
        />
        {validationAttempts.step3 && errors.purpose && (
          <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            {errors.purpose}
          </div>
        )}
      </div>
      
      <div className="param-group">
        <label className="param-label">
          Особые требования <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          className={`param-input ${validationAttempts.step3 && errors.requirements ? 'error' : ''}`}
          id="room-requirements"
          placeholder="Естественное освещение, звукоизоляция..."
          value={roomParams.requirements || ''}
          onChange={(e) => onParamChange('requirements', e.target.value)}
        />
        {validationAttempts.step3 && errors.requirements && (
          <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            {errors.requirements}
          </div>
        )}
      </div>
    </div>
  );
}
