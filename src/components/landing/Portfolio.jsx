import React from 'react';

export default function Portfolio() {
  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Наши работы</h2>
          <p className="section-subtitle">Реализованные проекты в различных стилях и для разных типов помещений</p>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-card">
            <div className="portfolio-image" style={{ backgroundColor: '#e2e8f0' }} />
            <div className="portfolio-content">
              <span className="portfolio-category">Квартира • 85 м²</span>
              <h3 className="portfolio-title">Лофт-апартаменты в центре</h3>
              <p className="portfolio-description">Современный лофт с индустриальными элементами и теплыми акцентами для молодой семьи</p>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image" style={{ backgroundColor: '#e2e8f0' }} />
            <div className="portfolio-content">
              <span className="portfolio-category">Загородный дом • 240 м²</span>
              <h3 className="portfolio-title">Современный коттедж</h3>
              <p className="portfolio-description">Минималистичный подход с использованием натуральных материалов и панорамным остеклением</p>
            </div>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-image" style={{ backgroundColor: '#e2e8f0' }} />
            <div className="portfolio-content">
              <span className="portfolio-category">Кафе • 120 м²</span>
              <h3 className="portfolio-title">Кофейня в скандинавском стиле</h3>
              <p className="portfolio-description">Светлое пространство с акцентом на функциональность и комфорт для посетителей</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


