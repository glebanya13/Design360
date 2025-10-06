import React from 'react';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Наши услуги</h2>
          <p className="section-subtitle">Комплексный подход к созданию комфортных и функциональных пространств</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <span className="service-icon">🏠</span>
            <h3 className="service-title">Дизайн интерьеров</h3>
            <p className="service-description">Создаем эстетичные и функциональные интерьеры для квартир, домов и коммерческих помещений</p>
            <ul className="service-features">
              <li>3D-визуализация</li>
              <li>Подбор материалов и мебели</li>
              <li>Авторский надзор</li>
              <li>Техническая документация</li>
            </ul>
          </div>
          <div className="service-card">
            <span className="service-icon">🏗️</span>
            <h3 className="service-title">Архитектурные решения</h3>
            <p className="service-description">Проектируем жилые и коммерческие здания с учетом эргономики и эстетики</p>
            <ul className="service-features">
              <li>Архитектурное проектирование</li>
              <li>Планировочные решения</li>
              <li>Фасадные работы</li>
              <li>Согласование проектов</li>
            </ul>
          </div>
          <div className="service-card">
            <span className="service-icon">⚙️</span>
            <h3 className="service-title">Инженерные системы</h3>
            <p className="service-description">Разрабатываем проекты инженерных коммуникаций для комфорта и безопасности</p>
            <ul className="service-features">
              <li>Электрика и освещение</li>
              <li>Отопление и вентиляция</li>
              <li>Водоснабжение и канализация</li>
              <li>Умный дом</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


