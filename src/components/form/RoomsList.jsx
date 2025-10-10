import React from 'react';
import RoomCard from './RoomCard';

export default function RoomsList({ 
  selectedRooms, 
  roomParams, 
  onParamChange, 
  onReset, 
  errors = {},
  getRoomName,
  isActive = false
}) {
  return (
    <div className={`content-section form-step ${isActive ? 'active' : ''}`}>
      <div className="rooms-list">
        <div className="rooms-list-header">
          <h3>Параметры помещений</h3>
          <div className="rooms-count">
            {selectedRooms.length} {selectedRooms.length === 1 ? 'помещение' : 'помещений'}
          </div>
        </div>
        
        <div className="rooms-grid">
          {selectedRooms.map((roomId, index) => (
            <RoomCard
              key={roomId}
              roomName={getRoomName(roomId)}
              roomParams={roomParams[roomId] || {
                length: '',
                width: '',
                height: '',
                area: '',
                purpose: '',
                requirements: ''
              }}
              onParamChange={(param, value) => onParamChange(roomId, param, value)}
              onReset={() => onReset(roomId)}
              errors={errors[roomId] || {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
