'use client';

import React from 'react';

const steps = [
    { id: 1, title: 'Тип объекта' },
    { id: 2, title: 'Помещения' },
    { id: 3, title: 'Параметры' },
    { id: 4, title: 'Экспликация' },
];

interface StepIndicatorProps {
    currentStep: number;
    onStepClick?: (stepId: number) => void;
    stepAccessibility?: Record<number, boolean>;
}

export default function StepIndicator({
    currentStep,
    onStepClick,
    stepAccessibility = {},
}: StepIndicatorProps) {
    return (
        <div className="steps-container">
            {steps.map((step) => {
                const isAccessible = stepAccessibility[step.id] || false;
                const isCurrent = currentStep === step.id;

                return (
                    <div
                        key={step.id}
                        className={`step ${isCurrent ? 'active' : ''} ${!isAccessible ? 'disabled' : ''}`}
                        onClick={() => isAccessible && onStepClick && onStepClick(step.id)}
                        style={{
                            cursor: isAccessible ? 'pointer' : 'not-allowed',
                            opacity: isAccessible ? 1 : 0.5,
                        }}
                    >
                        {step.title}
                        {!isAccessible && step.id > 1 && (
                            <span style={{ fontSize: '10px', color: '#ef4444', marginLeft: '4px' }}>
                                ⚠️
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
