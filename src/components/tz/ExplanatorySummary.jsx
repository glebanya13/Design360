import React from 'react';
import { ROOM_NAMES } from './RoomCard';

export default function ExplanatorySummary({ 
  selectedRooms, 
  roomsData, 
  totalArea 
}) {
  return (
    <div className="explanation-summary">
      <div className="summary-header">
        <span>Сводка по ГОСТ 21.501-2018</span>
        <span>Общая площадь: {totalArea} м²</span>
      </div>
      <div className="summary-items">
        {selectedRooms.map(roomId => {
          const roomData = roomsData[roomId] || {};
          return (
            <div key={roomId} className="summary-item">
              <span>{ROOM_NAMES[roomId]}</span>
              <span>{roomData.area || '0.0'} м²</span>
            </div>
          );
        })}
        <div className="summary-item total">
          <span>ИТОГО</span>
          <span>{totalArea} м²</span>
        </div>
      </div>
    </div>
  );
}
