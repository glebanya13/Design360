import React from 'react';

export default function ErrorMessage({ message, field }) {
  if (!message) return null;

  return (
    <div className="error-message" data-field={field}>
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
    </div>
  );
}

