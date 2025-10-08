import React from 'react';

const OBJECT_TYPES = [
  { key: 'apartment', icon: '🏢', name: 'Квартира', desc: 'Жилое помещение' },
  { key: 'studio', icon: '🏘️', name: 'Студия', desc: 'Открытое пространство' },
  { key: 'house', icon: '🏠', name: 'Частный дом', desc: 'Индивидуальное жилье' },
  { key: 'commercial', icon: '🏪', name: 'Коммерция', desc: 'Офис, магазин, кафе' }
];

export default function ObjectTypeSelector({ 
  selectedType, 
  onSelect 
}) {
  return (
    <div className="rooms-grid">
      {OBJECT_TYPES.map(type => (
        <div
          key={type.key}
          className={`room-card ${selectedType === type.key ? 'selected' : ''}`}
          onClick={() => onSelect(type.key)}
        >
          <div className="room-icon">{type.icon}</div>
          <div className="room-name">{type.name}</div>
          <div className="room-area">{type.desc}</div>
        </div>
      ))}
    </div>
  );
}
