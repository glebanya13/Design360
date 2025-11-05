'use client';

import React from 'react';

const roomTypes = [
    { id: 'living-room', icon: '🛋️', name: 'Гостиная' },
    { id: 'kitchen', icon: '🍳', name: 'Кухня' },
    { id: 'bedroom', icon: '🛏️', name: 'Спальня' },
    { id: 'bathroom', icon: '🚿', name: 'Ванная' },
    { id: 'toilet', icon: '🚽', name: 'Туалет' },
    { id: 'hallway', icon: '🚪', name: 'Прихожая' },
    { id: 'balcony', icon: '🌤️', name: 'Балкон' },
    { id: 'dressing-room', icon: '👔', name: 'Гардеробная' },
];

interface RoomSelectorProps {
    selectedRooms: string[];
    onRoomToggle: (roomId: string) => void;
    onSelectAll: () => void;
    errors?: Record<string, string>;
    validationAttempts?: Record<string, boolean>;
    isActive?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
    roomsCount?: number;
}

export default function RoomSelector({
    selectedRooms,
    onRoomToggle,
    onSelectAll,
    errors = {},
    validationAttempts = {},
    isActive = false,
    onPrev,
    onNext,
    roomsCount = 0,
}: RoomSelectorProps) {
    return (
        <div className={`content-section form-step ${isActive ? 'active' : ''}`}>
            <div className="section-header">
                <div className="section-title">Помещения для экспликации</div>
                <div className="section-actions">
                    <button className="btn btn-secondary" onClick={onSelectAll}>
                        Выбрать все
                    </button>
                </div>
            </div>

            <div
                className="rooms-limit-info"
                style={{
                    marginBottom: '16px',
                    padding: '12px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#0369a1',
                }}
            >
                <strong>📋 Лимит:</strong> Вы можете выбрать максимум {roomsCount}{' '}
                {roomsCount === 1 ? 'помещение' : roomsCount < 5 ? 'помещения' : 'помещений'} (выбрано:{' '}
                {selectedRooms.length}/{roomsCount})
            </div>

            <div className="rooms-grid">
                {roomTypes.map((room) => {
                    const isSelected = selectedRooms.includes(room.id);
                    const isDisabled = !isSelected && selectedRooms.length >= roomsCount;

                    return (
                        <div
                            key={room.id}
                            className={`room-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                            data-room={room.id}
                            onClick={() => !isDisabled && onRoomToggle(room.id)}
                            style={{
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                opacity: isDisabled ? 0.5 : 1,
                            }}
                        >
                            <div className="room-icon">{room.icon}</div>
                            <div className="room-name">{room.name}</div>
                            <div className="room-area">— м²</div>
                            {isDisabled && (
                                <div
                                    className="room-limit-badge"
                                    style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        background: '#ef4444',
                                        color: 'white',
                                        fontSize: '10px',
                                        padding: '2px 4px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    Лимит
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {validationAttempts.step2 && selectedRooms.length === 0 && (
                <div
                    className="validation-message"
                    style={{
                        marginBottom: '16px',
                        padding: '12px',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#dc2626',
                    }}
                >
                    <strong>⚠️ Обязательно:</strong> Выберите хотя бы одно помещение для создания экспликации
                </div>
            )}

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
