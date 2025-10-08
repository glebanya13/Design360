import React from 'react';
import RoomCard from './RoomCard';

const ALL_ROOMS = [
  'living-room', 'kitchen', 'bedroom', 'bathroom', 
  'toilet', 'hallway', 'balcony', 'dressing-room'
];

export default function RoomSelector({ 
  selectedRooms, 
  onToggleRoom, 
  onSelectAll,
  maxRooms = null
}) {
  const isRoomDisabled = (roomId) => {
    if (!maxRooms) return false;
    return !selectedRooms.includes(roomId) && selectedRooms.length >= maxRooms;
  };

  const handleRoomClick = (roomId) => {
    if (isRoomDisabled(roomId)) return;
    onToggleRoom(roomId);
  };

  return (
    <>
      {maxRooms && (
        <div className="room-limit-info" style={{ 
          marginBottom: '16px', 
          padding: '12px', 
          backgroundColor: 'var(--bg-light)', 
          borderRadius: '8px',
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }}>
          <strong>Лимит:</strong> можно выбрать максимум {maxRooms} помещений
          {selectedRooms.length > 0 && (
            <span style={{ marginLeft: '8px', color: 'var(--primary)' }}>
              (выбрано: {selectedRooms.length}/{maxRooms})
            </span>
          )}
        </div>
      )}
      
      <div className="rooms-grid">
        {ALL_ROOMS.map(roomId => (
          <RoomCard
            key={roomId}
            roomId={roomId}
            isSelected={selectedRooms.includes(roomId)}
            onClick={() => handleRoomClick(roomId)}
            showArea={false}
            disabled={isRoomDisabled(roomId)}
          />
        ))}
      </div>
      
      <div className="section-actions" style={{ marginTop: '16px' }}>
        <button className="btn btn-secondary" onClick={onSelectAll}>
          Выбрать все
        </button>
      </div>
    </>
  );
}
