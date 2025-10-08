import React from 'react';

export default function NavigationButtons({ 
  onPrev, 
  onNext, 
  showPrev = true, 
  showNext = true,
  prevText = 'Назад',
  nextText = 'Далее',
  nextDisabled = false
}) {
  return (
    <div className="summary-actions">
      {showPrev && (
        <button className="btn btn-secondary" onClick={onPrev}>
          {prevText}
        </button>
      )}
      {showNext && (
        <button 
          className="btn btn-primary" 
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextText}
        </button>
      )}
    </div>
  );
}
