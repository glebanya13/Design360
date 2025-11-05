import { useState, useCallback } from "react";

export interface FormData {
  objectType: string;
  totalArea: string;
  roomsCount: string;
  selectedRooms: string[];
  roomParams: {
    [key: string]: {
      length?: string | number;
      width?: string | number;
      height?: string | number;
      area?: string | number;
      purpose?: string;
      requirements?: string;
      description?: string;
    };
  };
}

export interface FormErrors {
  [key: string]: string;
}

export function useFormState() {
  const [formData, setFormData] = useState<FormData>({
    objectType: "",
    totalArea: "",
    roomsCount: "",
    selectedRooms: [],
    roomParams: {},
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationAttempts, setValidationAttempts] = useState(0);

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const updateRoomParams = useCallback(
    (roomId: string, param: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        roomParams: {
          ...prev.roomParams,
          [roomId]: {
            ...prev.roomParams[roomId],
            [param]: value,
          },
        },
      }));
    },
    []
  );

  const toggleRoom = useCallback((roomId: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedRooms.includes(roomId);
      return {
        ...prev,
        selectedRooms: isSelected
          ? prev.selectedRooms.filter((id) => id !== roomId)
          : [...prev.selectedRooms, roomId],
      };
    });
  }, []);

  const selectAllRooms = useCallback(() => {
    const allRooms = [
      "living-room",
      "bedroom",
      "kitchen",
      "bathroom",
      "hallway",
      "balcony",
    ];
    setFormData((prev) => ({
      ...prev,
      selectedRooms: allRooms,
    }));
  }, []);

  const resetRoomParams = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      roomParams: {},
    }));
  }, []);

  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setErrors({});
    } else {
      setValidationAttempts((prev) => prev + 1);
    }
  }, [currentStep, formData]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step <= currentStep || validateStepsUpTo(step - 1)) {
        setCurrentStep(step);
        setErrors({});
      }
    },
    [currentStep]
  );

  const validateCurrentStep = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.objectType) newErrors.objectType = "Выберите тип объекта";
      if (!formData.totalArea) newErrors.totalArea = "Укажите общую площадь";
      if (!formData.roomsCount)
        newErrors.roomsCount = "Укажите количество комнат";
    }

    if (currentStep === 2) {
      if (formData.selectedRooms.length === 0) {
        newErrors.selectedRooms = "Выберите хотя бы одну комнату";
      }
    }

    if (currentStep === 3) {
      formData.selectedRooms.forEach((roomId) => {
        const params = formData.roomParams[roomId];
        if (!params || !params.area) {
          newErrors[`${roomId}_area`] = "Укажите площадь";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, formData]);

  const validateStepsUpTo = useCallback((step: number): boolean => {
    // Simplified validation for navigation
    return true;
  }, []);

  const validateAllSteps = useCallback((): boolean => {
    return validateCurrentStep();
  }, [validateCurrentStep]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetValidationAttempts = useCallback(() => {
    setValidationAttempts(0);
  }, []);

  const getStepAccessibility = useCallback(() => {
    return {
      1: true,
      2: !!formData.objectType,
      3: formData.selectedRooms.length > 0,
      4: true,
    };
  }, [formData]);

  const canProceed = useCallback((): boolean => {
    return validateCurrentStep();
  }, [validateCurrentStep]);

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
    canProceed,
    validateCurrentStep,
    validateAllSteps,
    clearErrors,
    setSubmitting: setIsSubmitting,
    resetValidationAttempts,
    getStepAccessibility,
  };
}



