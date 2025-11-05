'use client';

import React, { useState } from 'react';
import { useFormState } from '@/lib/hooks/useFormState';
import { submitFormToBot } from '@/services/botService';
import '@/styles/tz.css';

// Простые компоненты для формы (используем оригинальную разметку)
const objectTypes = [
    { id: 'apartment', icon: '🏢', name: 'Квартира', description: 'Жилое помещение' },
    { id: 'studio', icon: '🏘️', name: 'Студия', description: 'Открытое пространство' },
    { id: 'house', icon: '🏠', name: 'Частный дом', description: 'Индивидуальное жилье' },
    { id: 'commercial', icon: '🏪', name: 'Коммерция', description: 'Офис, магазин, кафе' },
];

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

const roomNames: { [key: string]: string } = {
    'living-room': 'Гостиная',
    'kitchen': 'Кухня',
    'bedroom': 'Спальня',
    'bathroom': 'Ванная',
    'toilet': 'Туалет',
    'hallway': 'Прихожая',
    'balcony': 'Балкон',
    'dressing-room': 'Гардеробная',
};

export default function TZPage() {
    const {
        formData,
        currentStep,
        errors,
        isSubmitting,
        validationAttempts,
        updateFormData,
        updateRoomParams,
        toggleRoom,
        selectAllRooms,
        resetRoomParams,
        nextStep,
        prevStep,
        goToStep,
        validateAllSteps,
        setSubmitting,
        getStepAccessibility,
    } = useFormState();

    const [notification, setNotification] = useState<{
        type: 'success' | 'error' | 'warning';
        message: string;
    } | null>(null);

    const handleFinish = async () => {
        if (!validateAllSteps()) {
            setNotification({
                type: 'error',
                message: 'Пожалуйста, заполните все обязательные поля',
            });
            setTimeout(() => setNotification(null), 5000);
            return;
        }

        setSubmitting(true);
        
        try {
            const result = await submitFormToBot(formData);
            
            if (result.success) {
                setNotification({
                    type: 'success',
                    message: result.message || 'Техническое задание успешно отправлено!',
                });
                setTimeout(() => window.location.reload(), 3000);
            } else {
                setNotification({
                    type: 'error',
                    message: result.message || 'Произошла ошибка при отправке. Попробуйте еще раз.',
                });
                setSubmitting(false);
                setTimeout(() => setNotification(null), 5000);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setNotification({
                type: 'error',
                message: 'Произошла ошибка при отправке. Попробуйте еще раз или свяжитесь с нами напрямую.',
            });
            setSubmitting(false);
            setTimeout(() => setNotification(null), 5000);
        }
    };

    const stepAccessibility = getStepAccessibility() as Record<number, boolean>;

    return (
        <>
            <div className="main-container">
                <div className="steps-container">
                    {[
                        { id: 1, title: 'Тип объекта' },
                        { id: 2, title: 'Помещения' },
                        { id: 3, title: 'Параметры' },
                        { id: 4, title: 'Экспликация' },
                    ].map((step) => (
                        <div
                            key={step.id}
                            className={`step ${currentStep === step.id ? 'active' : ''} ${!stepAccessibility[step.id] ? 'disabled' : ''
                                }`}
                            onClick={() =>
                                stepAccessibility[step.id] && goToStep && goToStep(step.id)
                            }
                            style={{
                                cursor: stepAccessibility[step.id] ? 'pointer' : 'not-allowed',
                                opacity: stepAccessibility[step.id] ? 1 : 0.5,
                            }}
                        >
                            {step.title}
                        </div>
                    ))}
                </div>

                <div className="content-grid">
                    {/* Step 1 */}
                    {currentStep === 1 && (
                        <div className="content-section form-step active">
                            <div className="section-header">
                                <div className="section-title">Тип объекта</div>
                            </div>

                            <div className="rooms-grid">
                                {objectTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        className={`room-card ${formData.objectType === type.id ? 'selected' : ''
                                            }`}
                                        onClick={() => updateFormData({ objectType: type.id })}
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
                                        className="param-input"
                                        placeholder="65"
                                        value={formData.totalArea}
                                        onChange={(e) =>
                                            updateFormData({ totalArea: e.target.value })
                                        }
                                        min="0.1"
                                        step="0.1"
                                    />
                                </div>
                                <div className="param-group">
                                    <label className="param-label">
                                        Количество комнат <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="param-input"
                                        placeholder="3"
                                        value={formData.roomsCount}
                                        onChange={(e) =>
                                            updateFormData({ roomsCount: e.target.value })
                                        }
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="summary-actions">
                                <button className="btn btn-primary" onClick={nextStep}>
                                    Далее
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {currentStep === 2 && (
                        <div className="content-section form-step active">
                            <div className="section-header">
                                <div className="section-title">Помещения для экспликации</div>
                                <div className="section-actions">
                                    <button className="btn btn-secondary" onClick={selectAllRooms}>
                                        Выбрать все
                                    </button>
                                </div>
                            </div>

                            <div className="rooms-grid">
                                {roomTypes.map((room) => {
                                    const isSelected = formData.selectedRooms.includes(room.id);
                                    const isDisabled =
                                        !isSelected &&
                                        formData.selectedRooms.length >= parseInt(formData.roomsCount);

                                    return (
                                        <div
                                            key={room.id}
                                            className={`room-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''
                                                }`}
                                            onClick={() => !isDisabled && toggleRoom(room.id)}
                                            style={{
                                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                                opacity: isDisabled ? 0.5 : 1,
                                            }}
                                        >
                                            <div className="room-icon">{room.icon}</div>
                                            <div className="room-name">{room.name}</div>
                                            <div className="room-area">— м²</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="summary-actions">
                                <button className="btn btn-secondary" onClick={prevStep}>
                                    Назад
                                </button>
                                <button className="btn btn-primary" onClick={nextStep}>
                                    Далее
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {currentStep === 3 && (
                        <div className="content-section form-step active">
                            <div className="section-header">
                                <div className="section-title">Параметры помещений</div>
                                <div className="section-actions">
                                    <button className="btn btn-secondary" onClick={resetRoomParams}>
                                        Сбросить все
                                    </button>
                                </div>
                            </div>

                            <div className="rooms-params-list">
                                {formData.selectedRooms.map((roomId, index) => (
                                    <div key={roomId} className="room-params-card">
                                        <div className="room-params-header">
                                            <h3 className="room-params-title">
                                                {index + 1}. {roomNames[roomId] || roomId}
                                            </h3>
                                        </div>

                                        <div className="param-row">
                                            <div className="param-group">
                                                <label className="param-label">Площадь (м²)</label>
                                                <input
                                                    type="number"
                                                    className="param-input"
                                                    placeholder="18.5"
                                                    value={formData.roomParams[roomId]?.area || ''}
                                                    onChange={(e) =>
                                                        updateRoomParams(roomId, 'area', e.target.value)
                                                    }
                                                    min="0.1"
                                                    step="0.1"
                                                />
                                            </div>
                                            <div className="param-group">
                                                <label className="param-label">Высота (м)</label>
                                                <input
                                                    type="number"
                                                    className="param-input"
                                                    placeholder="2.7"
                                                    value={formData.roomParams[roomId]?.height || ''}
                                                    onChange={(e) =>
                                                        updateRoomParams(roomId, 'height', e.target.value)
                                                    }
                                                    min="0.1"
                                                    step="0.1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-actions">
                                <button className="btn btn-secondary" onClick={prevStep}>
                                    Назад
                                </button>
                                <button className="btn btn-primary" onClick={nextStep}>
                                    Далее
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4 */}
                    {currentStep === 4 && (
                        <div className="content-section form-step active">
                            <div className="section-header">
                                <div className="section-title">Экспликация помещений</div>
                            </div>

                            <div className="explanation-summary">
                                <div className="summary-header">
                                    <span>Сводка по ГОСТ 21.501-2018</span>
                                    <span>
                                        Общая площадь:{' '}
                                        {formData.selectedRooms
                                            .reduce((total, roomId) => {
                                                const params = formData.roomParams[roomId] || {};
                                                const areaValue = Number(params.area ?? 0);
                                                return total + (Number.isNaN(areaValue) ? 0 : areaValue);
                                            }, 0)
                                            .toFixed(1)}{' '}
                                        м²
                                    </span>
                                </div>
                                <div className="summary-items">
                                    {formData.selectedRooms.map((roomId) => {
                                        const params = formData.roomParams[roomId] || {};
                                        return (
                                            <div key={roomId} className="summary-item">
                                                <span>{roomNames[roomId] || roomId}</span>
                                                <span>{params.area || '0.0'} м²</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="summary-actions">
                                <button className="btn btn-secondary" onClick={prevStep}>
                                    Назад
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleFinish}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Отправка...' : 'Завершить'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {isSubmitting && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p>Отправка данных...</p>
                    </div>
                </div>
            )}
        </>
    );
}
