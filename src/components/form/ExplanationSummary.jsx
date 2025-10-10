import React from 'react';

const sampleData = [
  { name: 'Гостиная', area: '18.2' },
  { name: 'Кухня', area: '12.5' },
  { name: 'Спальня', area: '14.3' },
  { name: 'Ванная', area: '6.8' },
  { name: 'Прихожая', area: '8.5' }
];

export default function ExplanationSummary({ onExportPDF, isActive = false, onPrev, onFinish, formData, isSubmitting = false }) {
  return (
    <div className={`content-section form-step ${isActive ? 'active' : ''}`}>
      <div className="section-header">
        <div className="section-title">Экспликация помещений</div>
        <div className="section-actions">
          <button 
            className="btn btn-primary" 
            onClick={onExportPDF}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Экспорт в PDF'}
          </button>
        </div>
      </div>

      <div className="explanation-summary">
        <div className="summary-header">
          <span>Сводка по ГОСТ 21.501-2018</span>
          <span>Общая площадь: {(() => {
            if (formData?.selectedRooms && formData?.roomParams) {
              const totalArea = formData.selectedRooms.reduce((total, roomId) => {
                const params = formData.roomParams[roomId] || {};
                return total + (parseFloat(params.area) || 0);
              }, 0);
              return totalArea.toFixed(1);
            }
            return formData?.totalArea || '0';
          })()} м²</span>
        </div>
        <div className="summary-items">
          {formData?.selectedRooms?.map((roomId, index) => {
            const roomParams = formData?.roomParams?.[roomId];
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
            return (
              <div key={roomId} className="summary-item">
                <span>{roomNames[roomId] || roomId}</span>
                <span>{roomParams?.area || '0.0'} м²</span>
              </div>
            );
          }) || sampleData.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.name}</span>
              <span>{item.area} м²</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-light)' }}>
        <p>
          <strong>Примечание:</strong> Экспликация составлена в соответствии с ГОСТ 21.501-2018 
          "Правила выполнения рабочей документации архитектурных и конструктивных решений"
        </p>
      </div>

      <div className="summary-actions">
        <button className="btn btn-secondary" onClick={onPrev}>
          Назад
        </button>
        <button className="btn btn-primary" onClick={onFinish}>
          Завершить
        </button>
      </div>
    </div>
  );
}
