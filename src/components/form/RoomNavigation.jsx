import React from 'react';

export default function RoomNavigation({ 
  currentRoomIndex, 
  totalRooms, 
  roomNames, 
  onPrevRoom, 
  onNextRoom, 
  onGoToRoom 
}) {
  const currentRoomName = roomNames[currentRoomIndex] || `Помещение ${currentRoomIndex + 1}`;
  
  return (
    <div className="room-navigation">
      <div className="room-navigation-header">
        <h3>Параметры помещений</h3>
        <div className="room-counter">
          {currentRoomIndex + 1} из {totalRooms}
        </div>
      </div>
      
      <div className="room-tabs">
        {roomNames.map((name, index) => (
          <button
            key={index}
            className={`room-tab ${currentRoomIndex === index ? 'active' : ''}`}
            onClick={() => onGoToRoom(index)}
          >
            {name}
          </button>
        ))}
      </div>
      
      <div className="room-navigation-buttons">
        <button 
          className="btn btn-secondary"
          onClick={onPrevRoom}
          disabled={currentRoomIndex === 0}
        >
          ← Предыдущее
        </button>
        <button 
          className="btn btn-secondary"
          onClick={onNextRoom}
          disabled={currentRoomIndex === totalRooms - 1}
        >
          Следующее →
        </button>
      </div>
    </div>
  );
}

