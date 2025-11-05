'use client';

import React from 'react';
import ErrorMessage from './ErrorMessage';

interface RoomParams {
    length?: string | number;
    width?: string | number;
    height?: string | number;
    area?: string | number;
    purpose?: string;
    requirements?: string;
}

interface RoomCardProps {
    roomName: string;
    roomParams: RoomParams;
    onParamChange: (key: string, value: string) => void;
    onReset: () => void;
    errors?: Record<string, string>;
}

export default function RoomCard({
    roomName,
    roomParams,
    onParamChange,
    onReset,
    errors = {},
}: RoomCardProps) {
    const handleLengthChange = (value: string) => {
        onParamChange('length', value);
        // Автоматический расчет площади
        const width = roomParams.width || 0;
        const area = (parseFloat(value) * parseFloat(width.toString())).toFixed(1);
        onParamChange('area', area);
    };

    const handleWidthChange = (value: string) => {
        onParamChange('width', value);
        // Автоматический расчет площади
        const length = roomParams.length || 0;
        const area = (parseFloat(length.toString()) * parseFloat(value)).toFixed(1);
        onParamChange('area', area);
    };

    return (
        <div className="room-card-container">
            <div className="room-card-header">
                <h4 className="room-card-title">{roomName}</h4>
                <button className="btn btn-secondary btn-sm" onClick={onReset}>
                    Сбросить
                </button>
            </div>

            <div className="room-params">
                <div className="param-row">
                    <div className="param-group">
                        <label className="param-label">Длина (м)</label>
                        <input
                            type="number"
                            className={`param-input ${errors.roomLength ? 'error' : ''}`}
                            placeholder="4.5"
                            step="0.1"
                            value={roomParams.length || ''}
                            onChange={(e) => handleLengthChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.roomLength} field="roomLength" />
                    </div>
                    <div className="param-group">
                        <label className="param-label">Ширина (м)</label>
                        <input
                            type="number"
                            className={`param-input ${errors.roomWidth ? 'error' : ''}`}
                            placeholder="3.2"
                            step="0.1"
                            value={roomParams.width || ''}
                            onChange={(e) => handleWidthChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.roomWidth} field="roomWidth" />
                    </div>
                </div>
                <div className="param-row">
                    <div className="param-group">
                        <label className="param-label">Высота (м)</label>
                        <input
                            type="number"
                            className={`param-input ${errors.roomHeight ? 'error' : ''}`}
                            placeholder="2.7"
                            step="0.1"
                            value={roomParams.height || ''}
                            onChange={(e) => onParamChange('height', e.target.value)}
                        />
                        <ErrorMessage message={errors.roomHeight} field="roomHeight" />
                    </div>
                    <div className="param-group">
                        <label className="param-label">Площадь (м²)</label>
                        <input
                            type="number"
                            className="param-input"
                            placeholder="14.4"
                            step="0.1"
                            readOnly
                            value={roomParams.area || ''}
                        />
                    </div>
                </div>
                <div className="param-group">
                    <label className="param-label">Назначение помещения</label>
                    <input
                        type="text"
                        className={`param-input ${errors.roomPurpose ? 'error' : ''}`}
                        placeholder="Жилая комната, кухня, санузел..."
                        value={roomParams.purpose || ''}
                        onChange={(e) => onParamChange('purpose', e.target.value)}
                    />
                    <ErrorMessage message={errors.roomPurpose} field="roomPurpose" />
                </div>
                <div className="param-group">
                    <label className="param-label">Особые требования</label>
                    <input
                        type="text"
                        className="param-input"
                        placeholder="Естественное освещение, звукоизоляция..."
                        value={roomParams.requirements || ''}
                        onChange={(e) => onParamChange('requirements', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}


