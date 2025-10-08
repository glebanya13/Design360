import React from 'react';

const STEPS = [
  { id: 1, title: 'Тип объекта' },
  { id: 2, title: 'Помещения' },
  { id: 3, title: 'Параметры' },
  { id: 4, title: 'Экспликация' }
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="steps-container">
      {STEPS.map(step => (
        <div 
          key={step.id}
          className={`step ${currentStep === step.id ? 'active' : ''}`}
        >
          {step.title}
        </div>
      ))}
    </div>
  );
}
