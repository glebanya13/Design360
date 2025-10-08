import React from 'react';
import { ROOM_NAMES } from './RoomCard';

export default function RoomParams({ 
  roomId, 
  roomData = {}, 
  onUpdate 
}) {
  const hasLengthError = !roomData.length || parseFloat(roomData.length) <= 0;
  const hasWidthError = !roomData.width || parseFloat(roomData.width) <= 0;
  const hasHeightError = !roomData.height || parseFloat(roomData.height) <= 0;
  const hasPurposeError = !roomData.purpose || roomData.purpose.trim() === '';
  const hasRequirementsError = !roomData.requirements || roomData.requirements.trim() === '';
  const hasErrors = hasLengthError || hasWidthError || hasHeightError || hasPurposeError || hasRequirementsError;
  return (
    <div className="room-params" style={{ 
      marginBottom: '20px', 
      padding: '16px', 
      border: '1px solid var(--border)', 
      borderRadius: '8px' 
    }}>
      <h4 style={{ 
        marginBottom: '12px', 
        fontSize: '14px', 
        fontWeight: '600', 
        color: 'var(--primary)' 
      }}>
        {ROOM_NAMES[roomId]}
      </h4>
      
      <div className="param-row">
        <div className="param-group">
          <label className="param-label">
            Длина (м) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className={`param-input ${hasLengthError ? 'error' : ''}`}
            value={roomData.length || ''}
            onChange={(e) => onUpdate(roomId, { length: e.target.value })}
            placeholder="4.5"
            step="0.1"
            min="0.1"
          />
          {hasLengthError && (
            <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Обязательное поле. Значение должно быть больше 0.
            </div>
          )}
        </div>
        <div className="param-group">
          <label className="param-label">
            Ширина (м) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className={`param-input ${hasWidthError ? 'error' : ''}`}
            value={roomData.width || ''}
            onChange={(e) => onUpdate(roomId, { width: e.target.value })}
            placeholder="3.2"
            step="0.1"
            min="0.1"
          />
          {hasWidthError && (
            <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Обязательное поле. Значение должно быть больше 0.
            </div>
          )}
        </div>
      </div>
      
      <div style={{ 
        fontSize: '11px', 
        color: 'var(--text-light)', 
        marginBottom: '12px', 
        fontStyle: 'italic' 
      }}>
        💡 Площадь рассчитывается автоматически при вводе длины и ширины
      </div>
      
      <div className="param-row">
        <div className="param-group">
          <label className="param-label">
            Высота (м) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className={`param-input ${hasHeightError ? 'error' : ''}`}
            value={roomData.height || ''}
            onChange={(e) => onUpdate(roomId, { height: e.target.value })}
            placeholder="2.7"
            step="0.1"
            min="0.1"
          />
          {hasHeightError && (
            <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Обязательное поле. Значение должно быть больше 0.
            </div>
          )}
        </div>
        <div className="param-group">
          <label className="param-label">Площадь (м²)</label>
          <input
            type="number"
            className="param-input"
            value={roomData.area || ''}
            placeholder="0.0"
            step="0.1"
            readOnly
            style={{ 
              backgroundColor: 'var(--background)', 
              fontWeight: '600',
              color: roomData.area ? 'var(--primary)' : 'var(--text-light)'
            }}
          />
        </div>
      </div>
      
      <div className="param-group">
        <label className="param-label">
          Назначение помещения <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          className={`param-input ${hasPurposeError ? 'error' : ''}`}
          value={roomData.purpose || ''}
          onChange={(e) => onUpdate(roomId, { purpose: e.target.value })}
          placeholder="Жилая комната, кухня, санузел..."
        />
        {hasPurposeError && (
          <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            Обязательное поле. Укажите назначение помещения.
          </div>
        )}
      </div>
      
      <div className="param-group">
        <label className="param-label">
          Особые требования <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          className={`param-input ${hasRequirementsError ? 'error' : ''}`}
          value={roomData.requirements || ''}
          onChange={(e) => onUpdate(roomId, { requirements: e.target.value })}
          placeholder="Естественное освещение, звукоизоляция..."
        />
        {hasRequirementsError && (
          <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
            Обязательное поле. Укажите особые требования к помещению.
          </div>
        )}
      </div>
    </div>
  );
}
