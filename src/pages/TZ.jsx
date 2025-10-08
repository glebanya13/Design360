import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendExplanatoryToTelegram } from '../services/telegramService';
import Header from '../components/landing/Header';
import '../styles/TZ.css';
import '../styles/Landing.css';

// Импорт компонентов
import {
  StepIndicator,
  SectionHeader,
  NavigationButtons,
  ObjectTypeSelector,
  RoomSelector,
  RoomParams,
  ExplanatorySummary
} from '../components';

export default function TZ() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    objectType: 'apartment',
    totalArea: '',
    roomsCount: '',
    selectedRooms: [],
    roomsData: {}
  });
  const [isExporting, setIsExporting] = useState(false);
  const [validationAttempts, setValidationAttempts] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  const totalSteps = 4;

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    // Отмечаем попытку валидации для текущего шага
    setValidationAttempts(prev => ({
      ...prev,
      [`step${currentStep}`]: true
    }));
    
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const validateStep = (step) => {
    // Шаг 1: Тип объекта, общая площадь, количество комнат
    if (step === 1) {
      if (!formData.objectType) {
        alert('Пожалуйста, выберите тип объекта');
        return false;
      }
      if (!formData.totalArea || formData.totalArea.trim() === '') {
        alert('Пожалуйста, укажите общую площадь');
        return false;
      }
      if (parseFloat(formData.totalArea) <= 0) {
        alert('Общая площадь должна быть больше 0');
        return false;
      }
      if (!formData.roomsCount || formData.roomsCount.trim() === '') {
        alert('Пожалуйста, укажите количество комнат');
        return false;
      }
      if (parseInt(formData.roomsCount) <= 0) {
        alert('Количество комнат должно быть больше 0');
        return false;
      }
    }

    // Шаг 2: Выбор помещений
    if (step === 2) {
      if (formData.selectedRooms.length === 0) {
        alert('Пожалуйста, выберите хотя бы одно помещение');
        return false;
      }
      if (formData.roomsCount && parseInt(formData.roomsCount) > 0) {
        const maxRooms = parseInt(formData.roomsCount);
        if (formData.selectedRooms.length > maxRooms) {
          alert(`Количество выбранных помещений (${formData.selectedRooms.length}) не может превышать указанное количество комнат (${maxRooms})`);
          return false;
        }
      }
    }

    // Шаг 3: Параметры помещений
    if (step === 3) {
      const hasIncompleteRooms = formData.selectedRooms.some(roomId => {
        const roomData = formData.roomsData[roomId] || {};
        return !roomData.length || !roomData.width || !roomData.height || !roomData.purpose || !roomData.requirements ||
               parseFloat(roomData.length) <= 0 || parseFloat(roomData.width) <= 0 || parseFloat(roomData.height) <= 0 ||
               roomData.purpose.trim() === '' || roomData.requirements.trim() === '';
      });

      if (hasIncompleteRooms) {
        alert('Пожалуйста, заполните все параметры выбранных помещений:\n- Длина, ширина и высота должны быть больше 0\n- Назначение помещения и особые требования обязательны');
        return false;
      }
    }

    // Шаг 4: Экспликация (все данные уже должны быть заполнены)
    if (step === 4) {
      const totalArea = getTotalArea();
      if (parseFloat(totalArea) <= 0) {
        alert('Не удалось рассчитать общую площадь. Проверьте параметры помещений.');
        return false;
      }
    }

    return true;
  };

  // Функция для обновления параметров конкретного помещения
  const updateRoomData = (roomId, params) => {
    setFormData(prev => {
      const currentRoomData = prev.roomsData[roomId] || {};
      const newRoomData = { ...currentRoomData, ...params };
      
      // Пересчитываем площадь если изменились длина или ширина
      if (params.length !== undefined || params.width !== undefined) {
        const length = parseFloat(newRoomData.length || 0);
        const width = parseFloat(newRoomData.width || 0);
        newRoomData.area = (length * width).toFixed(1);
      }
      
      return {
        ...prev,
        roomsData: {
          ...prev.roomsData,
          [roomId]: newRoomData
        }
      };
    });
  };


  // Функция расчета общей площади
  const getTotalArea = () => {
    return Object.values(formData.roomsData).reduce((total, room) => {
      return total + parseFloat(room.area || 0);
    }, 0).toFixed(1);
  };

  const selectAllRooms = () => {
    const allRooms = ['living-room', 'kitchen', 'bedroom', 'bathroom', 'toilet', 'hallway', 'balcony', 'dressing-room'];
    const maxRooms = formData.roomsCount ? parseInt(formData.roomsCount) : null;
    
    if (maxRooms && maxRooms < allRooms.length) {
      // Если есть лимит, выбираем только первые N комнат
      updateField('selectedRooms', allRooms.slice(0, maxRooms));
    } else {
      // Если лимита нет или он больше количества комнат, выбираем все
      updateField('selectedRooms', allRooms);
    }
  };

  const resetRoomParams = () => {
    updateField('roomsData', {});
  };

  const exportToPDF = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      const result = await sendExplanatoryToTelegram(formData);
      alert(result.success ? `✅ ${result.message}` : `❌ ${result.message}`);
    } catch (error) {
      alert('❌ Произошла ошибка при отправке экспликации');
    } finally {
      setIsExporting(false);
    }
  };

  const submitForm = () => {
    if (validateStep(4)) {
      alert('Экспликация помещений успешно создана!');
    }
  };

  return (
    <div className="explanatory-container">
      <Header />

      <div className="main-container">
        <StepIndicator currentStep={currentStep} />

        <div className="content-grid">
          {/* Шаг 1: Тип объекта */}
          <div className={`content-section form-step ${currentStep === 1 ? 'active' : ''}`}>
            <SectionHeader title="Тип объекта" />
            
            <ObjectTypeSelector 
              selectedType={formData.objectType}
              onSelect={(type) => updateField('objectType', type)}
            />

            <div className="param-row" style={{ marginTop: '16px' }}>
              <div className="param-group">
                <label className="param-label">
                  Общая площадь (м²) <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  className={`param-input ${validationAttempts.step1 && (!formData.totalArea || parseFloat(formData.totalArea) <= 0) ? 'error' : ''}`}
                  value={formData.totalArea}
                  onChange={(e) => updateField('totalArea', e.target.value)}
                  placeholder="65"
                  min="0.1"
                  step="0.1"
                />
                {validationAttempts.step1 && (!formData.totalArea || parseFloat(formData.totalArea) <= 0) && (
                  <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    Обязательное поле. Значение должно быть больше 0.
                  </div>
                )}
              </div>
              <div className="param-group">
                <label className="param-label">
                  Количество комнат <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  className={`param-input ${validationAttempts.step1 && (!formData.roomsCount || parseInt(formData.roomsCount) <= 0) ? 'error' : ''}`}
                  value={formData.roomsCount}
                  onChange={(e) => updateField('roomsCount', e.target.value)}
                  placeholder="3"
                  min="1"
                />
                {validationAttempts.step1 && (!formData.roomsCount || parseInt(formData.roomsCount) <= 0) && (
                  <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    Обязательное поле. Значение должно быть больше 0.
                  </div>
                )}
              </div>
            </div>

            <NavigationButtons onPrev={prevStep} onNext={nextStep} showPrev={false} />
          </div>

          {/* Шаг 2: Выбор помещений */}
          <div className={`content-section form-step ${currentStep === 2 ? 'active' : ''}`}>
            <SectionHeader 
              title="Помещения для экспликации"
              actions={
                <button className="btn btn-secondary" onClick={selectAllRooms}>
                  Выбрать все
                </button>
              }
            />

            {validationAttempts.step2 && formData.selectedRooms.length === 0 && (
              <div className="validation-message" style={{ 
                marginBottom: '16px', 
                padding: '12px', 
                backgroundColor: '#fef2f2', 
                border: '1px solid #fecaca',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#dc2626'
              }}>
                <strong>⚠️ Обязательно:</strong> Выберите хотя бы одно помещение для создания экспликации
              </div>
            )}

            <RoomSelector 
              selectedRooms={formData.selectedRooms}
              onToggleRoom={(roomId) => {
                const newSelected = formData.selectedRooms.includes(roomId)
                  ? formData.selectedRooms.filter(r => r !== roomId)
                  : [...formData.selectedRooms, roomId];
                updateField('selectedRooms', newSelected);
              }}
              onSelectAll={selectAllRooms}
              maxRooms={formData.roomsCount ? parseInt(formData.roomsCount) : null}
            />

            <NavigationButtons onPrev={prevStep} onNext={nextStep} />
          </div>

          {/* Шаг 3: Параметры помещений */}
          <div className={`content-section form-step ${currentStep === 3 ? 'active' : ''}`}>
            <SectionHeader 
              title="Параметры помещений"
              actions={
                <button className="btn btn-secondary" onClick={resetRoomParams}>
                  Сбросить
                </button>
              }
            />

            {(() => {
              const hasIncompleteRooms = formData.selectedRooms.some(roomId => {
                const roomData = formData.roomsData[roomId] || {};
                return !roomData.length || !roomData.width || !roomData.height || !roomData.purpose || !roomData.requirements ||
                       parseFloat(roomData.length) <= 0 || parseFloat(roomData.width) <= 0 || parseFloat(roomData.height) <= 0 ||
                       roomData.purpose.trim() === '' || roomData.requirements.trim() === '';
              });

              return validationAttempts.step3 && hasIncompleteRooms && (
                <div className="validation-message" style={{ 
                  marginBottom: '16px', 
                  padding: '12px', 
                  backgroundColor: '#fef2f2', 
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#dc2626'
                }}>
                  <strong>⚠️ Обязательно:</strong> Заполните все параметры выбранных помещений:<br/>
                  • Длина, ширина и высота должны быть больше 0<br/>
                  • Назначение помещения и особые требования обязательны
                </div>
              );
            })()}

            {formData.selectedRooms.map(roomId => (
              <RoomParams
                key={roomId}
                roomId={roomId}
                roomData={formData.roomsData[roomId] || {}}
                onUpdate={updateRoomData}
              />
            ))}

            <NavigationButtons onPrev={prevStep} onNext={nextStep} />
          </div>

          {/* Шаг 4: Экспликация по ГОСТ */}
          <div className={`content-section form-step ${currentStep === 4 ? 'active' : ''}`}>
            <SectionHeader 
              title="Экспликация помещений"
              actions={
                <button 
                  className="btn btn-primary" 
                  onClick={exportToPDF}
                  disabled={isExporting}
                >
                  {isExporting ? 'Отправка...' : 'Экспорт в PDF'}
                </button>
              }
            />

            <ExplanatorySummary 
              selectedRooms={formData.selectedRooms}
              roomsData={formData.roomsData}
              totalArea={getTotalArea()}
            />

            <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-light)' }}>
              <p>
                <strong>Примечание:</strong> Экспликация составлена в соответствии с ГОСТ 21.501-2018 
                "Правила выполнения рабочей документации архитектурных и конструктивных решений"
              </p>
            </div>

            <NavigationButtons 
              onPrev={prevStep} 
              onNext={submitForm} 
              nextText="Завершить"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


