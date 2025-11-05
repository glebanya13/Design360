'use client';

import React from 'react';

const objectTypes = [
    { id: 'apartment', icon: '🏢', name: 'Квартира', description: 'Жилое помещение' },
    { id: 'studio', icon: '🏘️', name: 'Студия', description: 'Открытое пространство' },
    { id: 'house', icon: '🏠', name: 'Частный дом', description: 'Индивидуальное жилье' },
    { id: 'commercial', icon: '🏪', name: 'Коммерция', description: 'Офис, магазин, кафе' },
];

interface ObjectTypeSelectorProps {
    selectedType: string;
    onTypeSelect: (typeId: string) => void;
    totalArea: string | number;
    roomsCount: string | number;
    onAreaChange: (value: string) => void;
    onRoomsChange: (value: string) => void;
    errors?: Record<string, string>;
    validationAttempts?: Record<string, boolean>;
    isActive?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
}

export default function ObjectTypeSelector({
    selectedType,
    onTypeSelect,
    totalArea,
    roomsCount,
    onAreaChange,
    onRoomsChange,
    errors = {},
    validationAttempts = {},
    isActive = false,
    onPrev,
    onNext,
}: ObjectTypeSelectorProps) {
    return (
        <div className={`content-section form-step ${isActive ? 'active' : ''}`}>
            <div className="section-header">
                <div className="section-title">Тип объекта</div>
            </div>

            <div className="rooms-grid">
                {objectTypes.map((type) => (
                    <div
                        key={type.id}
                        className={`room-card ${selectedType === type.id ? 'selected' : ''}`}
                        data-type={type.id}
                        onClick={() => onTypeSelect(type.id)}
                    >
                        <div className="room-icon">{type.icon}</div>
                        <div className="room-name">{type.name}</div>
                        <div className="room-area">{type.description}</div>
                    </div>
                ))}
            </div>

            <div className="param-row" style={{ marginTop: '16px' }}>
                <div className="param-group">
                    <label className="param-label">
                        Общая площадь (м²) <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="number"
                        className={`param-input ${validationAttempts.step1 && errors.totalArea ? 'error' : ''}`}
                        id="total-area"
                        placeholder="65"
                        value={totalArea}
                        onChange={(e) => onAreaChange(e.target.value)}
                        min="0.1"
                        step="0.1"
                    />
                    {validationAttempts.step1 && errors.totalArea && (
                        <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                            {errors.totalArea}
                        </div>
                    )}
                </div>
                <div className="param-group">
                    <label className="param-label">
                        Количество комнат <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="number"
                        className={`param-input ${validationAttempts.step1 && errors.roomsCount ? 'error' : ''}`}
                        id="rooms-count"
                        placeholder="3"
                        value={roomsCount}
                        onChange={(e) => onRoomsChange(e.target.value)}
                        min="1"
                    />
                    {validationAttempts.step1 && errors.roomsCount && (
                        <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                            {errors.roomsCount}
                        </div>
                    )}
                </div>
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
