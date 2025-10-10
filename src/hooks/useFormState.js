import { useState, useCallback } from 'react';
import { validateStep, validateForm, getFieldErrorMessage } from '../utils/validation';

const initialFormData = {
  objectType: 'apartment',
  totalArea: '65',
  roomsCount: '3',
  selectedRooms: ['living-room', 'kitchen', 'bedroom'],
  roomParams: {
    'living-room': {
      length: '4.5',
      width: '3.2',
      height: '2.7',
      area: '14.4',
      purpose: 'Жилая комната',
      requirements: 'Естественное освещение'
    },
    'kitchen': {
      length: '3.0',
      width: '2.5',
      height: '2.7',
      area: '7.5',
      purpose: 'Кухня',
      requirements: 'Вентиляция, водоснабжение'
    },
    'bedroom': {
      length: '3.5',
      width: '3.0',
      height: '2.7',
      area: '10.5',
      purpose: 'Спальня',
      requirements: 'Тишина, затемнение'
    }
  }
};

export function useFormState() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [validationAttempts, setValidationAttempts] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  const updateFormData = useCallback((updates) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      
      // Если изменилось количество комнат, обновляем выбранные комнаты
      if (updates.roomsCount !== undefined) {
        const maxRooms = parseInt(updates.roomsCount) || 0;
        const currentSelected = newData.selectedRooms || [];
        
        // Если выбранных комнат больше нового лимита, обрезаем список
        if (currentSelected.length > maxRooms) {
          const removedRooms = currentSelected.slice(maxRooms);
          newData.selectedRooms = currentSelected.slice(0, maxRooms);
          
          // Очищаем параметры удаленных комнат
          removedRooms.forEach(roomId => {
            if (newData.roomParams && newData.roomParams[roomId]) {
              delete newData.roomParams[roomId];
            }
          });
        }
      }
      
      return newData;
    });
  }, []);

  const updateRoomParams = useCallback((roomId, param, value) => {
    setFormData(prev => ({
      ...prev,
      roomParams: {
        ...prev.roomParams,
        [roomId]: {
          ...prev.roomParams[roomId],
          [param]: value
        }
      }
    }));
  }, []);

  const getCurrentRoomParams = useCallback(() => {
    const currentRoomId = formData.selectedRooms[currentRoomIndex];
    return formData.roomParams[currentRoomId] || {
      length: '',
      width: '',
      height: '',
      area: '',
      purpose: '',
      requirements: ''
    };
  }, [formData.selectedRooms, formData.roomParams, currentRoomIndex]);

  const getRoomName = useCallback((roomId) => {
    const roomNames = {
      'living-room': 'Гостиная',
      'kitchen': 'Кухня',
      'bedroom': 'Спальня',
      'bathroom': 'Ванная',
      'toilet': 'Туалет',
      'hallway': 'Прихожая',
      'balcony': 'Балкон',
      'dressing-room': 'Гардеробная'
    };
    return roomNames[roomId] || roomId;
  }, []);

  const nextRoom = useCallback(() => {
    if (currentRoomIndex < formData.selectedRooms.length - 1) {
      setCurrentRoomIndex(prev => prev + 1);
    }
  }, [currentRoomIndex, formData.selectedRooms.length]);

  const prevRoom = useCallback(() => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(prev => prev - 1);
    }
  }, [currentRoomIndex]);

  const goToRoom = useCallback((index) => {
    if (index >= 0 && index < formData.selectedRooms.length) {
      setCurrentRoomIndex(index);
    }
  }, [formData.selectedRooms.length]);

  const toggleRoom = useCallback((roomId) => {
    setFormData(prev => {
      const maxRooms = parseInt(prev.roomsCount) || 0;
      const currentSelected = prev.selectedRooms || [];
      
      // Если комната уже выбрана, убираем её
      if (currentSelected.includes(roomId)) {
        return {
          ...prev,
          selectedRooms: currentSelected.filter(id => id !== roomId)
        };
      }
      
      // Если комната не выбрана, добавляем только если не превышен лимит
      if (currentSelected.length < maxRooms) {
        return {
          ...prev,
          selectedRooms: [...currentSelected, roomId]
        };
      }
      
      // Если лимит превышен, не добавляем
      return prev;
    });
  }, []);

  const selectAllRooms = useCallback(() => {
    const allRoomIds = [
      'living-room', 'kitchen', 'bedroom', 'bathroom', 
      'toilet', 'hallway', 'balcony', 'dressing-room'
    ];
    setFormData(prev => {
      const maxRooms = parseInt(prev.roomsCount) || 0;
      const limitedRooms = allRoomIds.slice(0, maxRooms);
      return { ...prev, selectedRooms: limitedRooms };
    });
  }, []);

  const resetRoomParams = useCallback((roomId) => {
    setFormData(prev => ({
      ...prev,
      roomParams: {
        ...prev.roomParams,
        [roomId]: {
          length: '',
          width: '',
          height: '',
          area: '',
          purpose: '',
          requirements: ''
        }
      }
    }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    const stepErrors = {};
    
    switch(currentStep) {
      case 1:
        if (!formData.objectType) {
          stepErrors.objectType = getFieldErrorMessage('objectType', formData.objectType);
        }
        if (!formData.totalArea) {
          stepErrors.totalArea = getFieldErrorMessage('totalArea', formData.totalArea);
        }
        if (!formData.roomsCount) {
          stepErrors.roomsCount = getFieldErrorMessage('roomsCount', formData.roomsCount);
        }
        break;
        
      case 2:
        if (formData.selectedRooms.length === 0) {
          stepErrors.selectedRooms = getFieldErrorMessage('selectedRooms', formData.selectedRooms);
        }
        break;
        
      case 3:
        // Валидация для всех выбранных помещений
        formData.selectedRooms.forEach(roomId => {
          const roomParams = formData.roomParams[roomId] || {};
          if (!roomParams.length) {
            stepErrors[`${roomId}_length`] = getFieldErrorMessage('roomLength', roomParams.length);
          }
          if (!roomParams.width) {
            stepErrors[`${roomId}_width`] = getFieldErrorMessage('roomWidth', roomParams.width);
          }
          if (!roomParams.height) {
            stepErrors[`${roomId}_height`] = getFieldErrorMessage('roomHeight', roomParams.height);
          }
          if (!roomParams.purpose) {
            stepErrors[`${roomId}_purpose`] = getFieldErrorMessage('roomPurpose', roomParams.purpose);
          }
          if (!roomParams.requirements) {
            stepErrors[`${roomId}_requirements`] = getFieldErrorMessage('roomRequirements', roomParams.requirements);
          }
        });
        break;
        
      case 4:
        // Последний шаг всегда валиден
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    // Отмечаем попытку валидации для текущего шага
    setValidationAttempts(prev => ({
      ...prev,
      [`step${currentStep}`]: true
    }));
    
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  }, [currentStep, validateCurrentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const validateStepsUpTo = useCallback((targetStep) => {
    for (let step = 1; step < targetStep; step++) {
      if (!validateStep(step, formData)) {
        return false;
      }
    }
    return true;
  }, [formData]);

  const getStepAccessibility = useCallback(() => {
    const accessibility = {};
    for (let step = 1; step <= 4; step++) {
      if (step === 1) {
        accessibility[step] = true;
      } else {
        accessibility[step] = validateStepsUpTo(step);
      }
    }
    return accessibility;
  }, [validateStepsUpTo]);

  const goToStep = useCallback((step) => {
    const targetStep = Math.max(1, Math.min(step, 4));
    
    // Если пытаемся перейти на шаг больше текущего, проверяем валидность всех предыдущих шагов
    if (targetStep > currentStep) {
      if (!validateStepsUpTo(targetStep)) {
        // Показываем ошибки для всех невалидных шагов
        const allErrors = {};
        for (let step = 1; step < targetStep; step++) {
          const stepErrors = validateStep(step, formData) ? {} : { [`step${step}`]: 'Заполните все обязательные поля' };
          Object.assign(allErrors, stepErrors);
        }
        setErrors(allErrors);
        return;
      }
    }
    
    setCurrentStep(targetStep);
  }, [currentStep, formData, validateStepsUpTo]);


  const canProceed = useCallback(() => {
    return validateCurrentStep();
  }, [validateCurrentStep]);

  const validateAllSteps = useCallback(() => {
    const validation = validateForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  }, [formData]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setSubmitting = useCallback((submitting) => {
    setIsSubmitting(submitting);
  }, []);

  const resetValidationAttempts = useCallback(() => {
    setValidationAttempts({
      step1: false,
      step2: false,
      step3: false,
      step4: false
    });
  }, []);

  return {
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
    validateCurrentStep,
    validateAllSteps,
    canProceed,
    clearErrors,
    setSubmitting,
    resetValidationAttempts,
    getStepAccessibility
  };
}
