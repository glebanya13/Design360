import React from 'react';

const ROOM_NAMES = {
  'living-room': 'Гостиная',
  'kitchen': 'Кухня',
  'bedroom': 'Спальня',
  'bathroom': 'Ванная',
  'toilet': 'Туалет',
  'hallway': 'Прихожая',
  'balcony': 'Балкон',
  'dressing-room': 'Гардеробная'
};

const ROOM_ICONS = {
  'living-room': '🛋️',
  'kitchen': '🍳',
  'bedroom': '🛏️',
  'bathroom': '🚿',
  'toilet': '🚽',
  'hallway': '🚪',
  'balcony': '🌤️',
  'dressing-room': '👔'
};

export default function RoomCard({ 
  roomId, 
  isSelected, 
  onClick, 
  area = '— м²',
  showArea = true,
  disabled = false
}) {
  return (
    <div 
      className={`room-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }}
    >
      <div className="room-icon">{ROOM_ICONS[roomId]}</div>
      <div className="room-name">{ROOM_NAMES[roomId]}</div>
      {showArea && <div className="room-area">{area}</div>}
    </div>
  );
}

export { ROOM_NAMES };
