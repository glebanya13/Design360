import React from 'react';
import RoomParams from './RoomParams';

export default function RoomsParamsList({ 
  selectedRooms, 
  roomParams, 
  onParamChange, 
  onReset, 
  errors = {}, 
  validationAttempts = {},
  isActive = false,
  onPrev,
  onNext
}) {
  const getRoomName = (roomId) => {
    const roomNames = {
      'living-room': 'Гостиная',
      'kitchen': 'Кухня',
      'bedroom': 'Спальня',
      'bathroom': 'Ванная',
      'toilet': 'Туалет',
      'hallway': 'Прихожая',
      'balcony': 'Балкон',
      'dressing-room': 'Гардеробная'
    };
    return roomNames[roomId] || roomId;
  };

  return (
    <div className={`content-section form-step ${isActive ? 'active' : ''}`}>
      <div className="section-header">
        <div className="section-title">Параметры помещений</div>
        <div className="section-actions">
          <button className="btn btn-secondary" onClick={() => selectedRooms.forEach(roomId => onReset(roomId))}>
            Сбросить все
          </button>
        </div>
      </div>

      {(() => {
        const hasIncompleteRooms = selectedRooms.some(roomId => {
          const roomData = roomParams[roomId] || {};
          return !roomData.length || !roomData.width || !roomData.height || !roomData.purpose || !roomData.requirements ||
                 parseFloat(roomData.length) <= 0 || parseFloat(roomData.width) <= 0 || parseFloat(roomData.height) <= 0 ||
                 roomData.purpose.trim() === '' || roomData.requirements.trim() === '';
        });

        return validationAttempts.step3 && hasIncompleteRooms && (
          <div className="validation-message" style={{ 
            marginBottom: '16px', 
            padding: '12px', 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#dc2626'
          }}>
            <strong>⚠️ Обязательно:</strong> Заполните все параметры выбранных помещений:<br/>
            • Длина, ширина и высота должны быть больше 0<br/>
            • Назначение помещения и особые требования обязательны
          </div>
        );
      })()}

      <div className="rooms-params-list">
        {selectedRooms.map((roomId, index) => (
          <div key={roomId} className="room-params-card">
            <div className="room-params-header">
              <h3 className="room-params-title">
                {index + 1}. {getRoomName(roomId)}
              </h3>
              <button className="btn btn-secondary" onClick={() => onReset(roomId)}>
                Сбросить
              </button>
            </div>
            
            <RoomParams
              roomId={roomId}
              roomParams={roomParams[roomId] || {}}
              onParamChange={(param, value) => onParamChange(roomId, param, value)}
              errors={{
                length: errors[`${roomId}_length`],
                width: errors[`${roomId}_width`],
                height: errors[`${roomId}_height`],
                purpose: errors[`${roomId}_purpose`],
                requirements: errors[`${roomId}_requirements`]
              }}
              validationAttempts={validationAttempts}
              isActive={true}
            />
          </div>
        ))}
      </div>

      <div className="summary-actions">
        <button className="btn btn-secondary" onClick={onPrev}>
          Назад
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Далее
        </button>
      </div>
    </div>
  );
}
