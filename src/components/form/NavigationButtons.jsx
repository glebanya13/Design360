import React from 'react';

export default function NavigationButtons({ 
  currentStep, 
  totalSteps, 
  onPrev, 
  onNext, 
  onFinish,
  showPrev = true,
  showNext = true,
  showFinish = false
}) {
  const handleNext = () => {
    if (currentStep < totalSteps) {
      onNext();
    }
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish();
    }
  };

  return (
    <div className="summary-actions">
      {showPrev && (
        <button className="btn btn-secondary" onClick={onPrev}>
          Назад
        </button>
      )}
      {showNext && !showFinish && (
        <button className="btn btn-primary" onClick={handleNext}>
          Далее
        </button>
      )}
      {showFinish && (
        <button className="btn btn-primary" onClick={handleFinish}>
          Завершить
        </button>
      )}
    </div>
  );
}

