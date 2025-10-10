import React, { useState } from 'react';
import '../styles/TZNew.css';
import { 
  Header, 
  StepIndicator, 
  ObjectTypeSelector, 
  RoomSelector, 
  RoomsParamsList,
  ExplanationSummary, 
} from '../components/form';
import { useFormState } from '../hooks/useFormState';
import { submitFormToBot, checkBotConfig } from '../services/botService';

export default function TZNew() {
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
    canProceed,
    validateCurrentStep,
    validateAllSteps,
    clearErrors,
    setSubmitting,
    resetValidationAttempts,
    getStepAccessibility
  } = useFormState();

  const [notification, setNotification] = useState(null);

  const totalSteps = 4;

  const handleTypeSelect = (type) => {
    updateFormData({ objectType: type });
  };

  const handleAreaChange = (area) => {
    updateFormData({ totalArea: area });
  };

  const handleRoomsChange = (rooms) => {
    updateFormData({ roomsCount: rooms });
  };

  const handleRoomToggle = (roomId) => {
    toggleRoom(roomId);
  };

  const handleSelectAll = () => {
    selectAllRooms();
  };

  const handleParamChange = (param, value) => {
    updateRoomParams(param, value);
  };

  const handleReset = () => {
    resetRoomParams();
  };

  const handleNext = () => {
    clearErrors();
    nextStep();
  };

  const handlePrev = () => {
    clearErrors();
    prevStep();
  };

  const handleFinish = async () => {
    if (!validateAllSteps()) {
      setNotification({
        type: 'error',
        message: 'Пожалуйста, заполните все обязательные поля'
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    if (!checkBotConfig()) {
      setNotification({
        type: 'warning',
        message: 'Конфигурация бота не настроена. Данные сохранены локально.'
      });
      setTimeout(() => setNotification(null), 5000);
      console.log('Данные для экспликации:', formData);
      return;
    }

    setSubmitting(true);
    
    try {
      const result = await submitFormToBot(formData);
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: result.message
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setNotification({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.'
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleExportPDF = async () => {
    if (!validateAllSteps()) {
      setNotification({
        type: 'error',
        message: 'Пожалуйста, заполните все обязательные поля'
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    if (!checkBotConfig()) {
      setNotification({
        type: 'warning',
        message: 'Конфигурация бота не настроена. Данные сохранены локально.'
      });
      setTimeout(() => setNotification(null), 5000);
      console.log('Данные для экспликации:', formData);
      return;
    }

    setSubmitting(true);
    
    try {
      const result = await submitFormToBot(formData);
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Экспликация успешно отправлена в Telegram!'
        });
      } else {
        setNotification({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Произошла ошибка при отправке экспликации. Попробуйте еще раз.'
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <ObjectTypeSelector
            selectedType={formData.objectType}
            onTypeSelect={handleTypeSelect}
            totalArea={formData.totalArea}
            roomsCount={formData.roomsCount}
            onAreaChange={handleAreaChange}
            onRoomsChange={handleRoomsChange}
            errors={errors}
            validationAttempts={validationAttempts}
            isActive={true}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <RoomSelector
            selectedRooms={formData.selectedRooms}
            onRoomToggle={handleRoomToggle}
            onSelectAll={handleSelectAll}
            errors={errors}
            validationAttempts={validationAttempts}
            isActive={true}
            onPrev={handlePrev}
            onNext={handleNext}
            roomsCount={parseInt(formData.roomsCount) || 0}
          />
        );
      case 3:
        return (
          <RoomsParamsList
            selectedRooms={formData.selectedRooms}
            roomParams={formData.roomParams}
            onParamChange={updateRoomParams}
            onReset={resetRoomParams}
            errors={errors}
            validationAttempts={validationAttempts}
            isActive={true}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <ExplanationSummary
            onExportPDF={handleExportPDF}
            isActive={true}
            onPrev={handlePrev}
            onFinish={handleFinish}
            formData={formData}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      
      <div className="main-container">
        <StepIndicator 
          currentStep={currentStep} 
          onStepClick={goToStep}
          stepAccessibility={getStepAccessibility()}
        />

        <div className="content-grid">
          {renderStep()}
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
    </div>
  );
}
