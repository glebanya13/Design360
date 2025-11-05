'use client';

import React from 'react';

interface ErrorMessageProps {
    message?: string;
    field: string;
}

export default function ErrorMessage({ message, field }: ErrorMessageProps) {
    if (!message) return null;

    return (
        <div className="error-message" role="alert" aria-live="polite">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{message}</span>
        </div>
    );
}


