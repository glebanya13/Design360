import React from 'react';

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Как мы работаем</h2>
          <p className="section-subtitle">Четкий процесс от первой консультации до сдачи проекта</p>
        </div>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3 className="step-title">Консультация</h3>
            <p className="step-description">Обсуждаем ваши пожелания, бюджет и сроки</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3 className="step-title">ТЗ и договор</h3>
            <p className="step-description">Составляем техническое задание и заключаем договор</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3 className="step-title">Проектирование</h3>
            <p className="step-description">Разрабатываем концепцию и рабочий проект</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3 className="step-title">Реализация</h3>
            <p className="step-description">Контролируем выполнение работ на объекте</p>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h3 className="step-title">Сдача проекта</h3>
            <p className="step-description">Завершаем работы и сдаем готовый объект</p>
          </div>
        </div>
      </div>
    </section>
  );
}


