// Валидация полей формы
export const validateField = (field, value) => {
  switch (field) {
    case 'objectType':
      return value && value.trim() !== '';
    
    case 'totalArea':
      if (!value || value.trim() === '') return false;
      const area = parseFloat(value);
      return !isNaN(area) && area > 0 && area <= 10000;
    
    case 'roomsCount':
      if (!value || value.trim() === '') return false;
      const rooms = parseInt(value);
      return !isNaN(rooms) && rooms > 0 && rooms <= 50;
    
    case 'selectedRooms':
      return Array.isArray(value) && value.length > 0;
    
    case 'roomLength':
      if (!value || value.trim() === '') return false;
      const length = parseFloat(value);
      return !isNaN(length) && length > 0 && length <= 100;
    
    case 'roomWidth':
      if (!value || value.trim() === '') return false;
      const width = parseFloat(value);
      return !isNaN(width) && width > 0 && width <= 100;
    
    case 'roomHeight':
      if (!value || value.trim() === '') return false;
      const height = parseFloat(value);
      return !isNaN(height) && height > 0 && height <= 10;
    
    case 'roomPurpose':
      return value && value.trim().length >= 3;
    
    case 'roomRequirements':
      return value && value.trim().length >= 3;
    
    default:
      return true;
  }
};

// Валидация всего шага
export const validateStep = (step, formData) => {
  switch (step) {
    case 1:
      return (
        validateField('objectType', formData.objectType) &&
        validateField('totalArea', formData.totalArea) &&
        validateField('roomsCount', formData.roomsCount)
      );
    
    case 2:
      return validateField('selectedRooms', formData.selectedRooms);
    
    case 3:
      // Валидация для всех выбранных помещений
      if (!formData.selectedRooms || formData.selectedRooms.length === 0) {
        return false;
      }
      
      return formData.selectedRooms.every(roomId => {
        const roomParams = formData.roomParams?.[roomId] || {};
        return (
          validateField('roomLength', roomParams.length) &&
          validateField('roomWidth', roomParams.width) &&
          validateField('roomHeight', roomParams.height) &&
          validateField('roomPurpose', roomParams.purpose) &&
          validateField('roomRequirements', roomParams.requirements)
        );
      });
    
    case 4:
      return true; // Последний шаг всегда валиден
    
    default:
      return false;
  }
};

// Получение сообщений об ошибках
export const getFieldErrorMessage = (field, value) => {
  switch (field) {
    case 'objectType':
      return 'Выберите тип объекта';
    
    case 'totalArea':
      const area = parseFloat(value);
      if (!value || value.trim() === '') return 'Введите общую площадь';
      if (isNaN(area)) return 'Площадь должна быть числом';
      if (area <= 0) return 'Площадь должна быть больше 0';
      if (area > 10000) return 'Площадь не может быть больше 10000 м²';
      return '';
    
    case 'roomsCount':
      const rooms = parseInt(value);
      if (!value || value.trim() === '') return 'Введите количество комнат';
      if (isNaN(rooms)) return 'Количество комнат должно быть числом';
      if (rooms <= 0) return 'Количество комнат должно быть больше 0';
      if (rooms > 50) return 'Количество комнат не может быть больше 50';
      return '';
    
    case 'selectedRooms':
      return 'Выберите хотя бы одно помещение';
    
    case 'roomLength':
      const length = parseFloat(value);
      if (!value || value.trim() === '') return 'Введите длину помещения';
      if (isNaN(length)) return 'Длина должна быть числом';
      if (length <= 0) return 'Длина должна быть больше 0';
      if (length > 100) return 'Длина не может быть больше 100 м';
      return '';
    
    case 'roomWidth':
      const width = parseFloat(value);
      if (!value || value.trim() === '') return 'Введите ширину помещения';
      if (isNaN(width)) return 'Ширина должна быть числом';
      if (width <= 0) return 'Ширина должна быть больше 0';
      if (width > 100) return 'Ширина не может быть больше 100 м';
      return '';
    
    case 'roomHeight':
      const height = parseFloat(value);
      if (!value || value.trim() === '') return 'Введите высоту помещения';
      if (isNaN(height)) return 'Высота должна быть числом';
      if (height <= 0) return 'Высота должна быть больше 0';
      if (height > 10) return 'Высота не может быть больше 10 м';
      return '';
    
    case 'roomPurpose':
      if (!value || value.trim() === '') return 'Введите назначение помещения';
      if (value.trim().length < 3) return 'Назначение должно содержать минимум 3 символа';
      return '';
    
    case 'roomRequirements':
      if (!value || value.trim() === '') return 'Введите особые требования';
      if (value.trim().length < 3) return 'Требования должны содержать минимум 3 символа';
      return '';
    
    default:
      return '';
  }
};

// Валидация всех данных формы
export const validateForm = (formData) => {
  const errors = {};
  
  // Валидация шага 1
  if (!validateField('objectType', formData.objectType)) {
    errors.objectType = getFieldErrorMessage('objectType', formData.objectType);
  }
  if (!validateField('totalArea', formData.totalArea)) {
    errors.totalArea = getFieldErrorMessage('totalArea', formData.totalArea);
  }
  if (!validateField('roomsCount', formData.roomsCount)) {
    errors.roomsCount = getFieldErrorMessage('roomsCount', formData.roomsCount);
  }
  
  // Валидация шага 2
  if (!validateField('selectedRooms', formData.selectedRooms)) {
    errors.selectedRooms = getFieldErrorMessage('selectedRooms', formData.selectedRooms);
  }
  
  // Валидация шага 3 - для всех выбранных помещений
  if (formData.selectedRooms && formData.roomParams) {
    formData.selectedRooms.forEach(roomId => {
      const roomParams = formData.roomParams[roomId] || {};
      
      if (!validateField('roomLength', roomParams.length)) {
        errors[`${roomId}_length`] = getFieldErrorMessage('roomLength', roomParams.length);
      }
      if (!validateField('roomWidth', roomParams.width)) {
        errors[`${roomId}_width`] = getFieldErrorMessage('roomWidth', roomParams.width);
      }
      if (!validateField('roomHeight', roomParams.height)) {
        errors[`${roomId}_height`] = getFieldErrorMessage('roomHeight', roomParams.height);
      }
      if (!validateField('roomPurpose', roomParams.purpose)) {
        errors[`${roomId}_purpose`] = getFieldErrorMessage('roomPurpose', roomParams.purpose);
      }
      if (!validateField('roomRequirements', roomParams.requirements)) {
        errors[`${roomId}_requirements`] = getFieldErrorMessage('roomRequirements', roomParams.requirements);
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
