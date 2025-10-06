import React from 'react';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Дизайн360</h3>
            <p>Профессиональные услуги дизайна интерьеров, архитектурные и инженерные решения. Создаем функциональные и эстетичные пространства под ключ.</p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">📺</a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Услуги</h3>
            <ul className="footer-links">
              <li><a href="#">Дизайн интерьеров</a></li>
              <li><a href="#">Архитектурные решения</a></li>
              <li><a href="#">Инженерные системы</a></li>
              <li><a href="#">Авторский надзор</a></li>
              <li><a href="#">Комплексный ремонт</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Контакты</h3>
            <ul className="contact-info">
              <li>
                <span className="icon">📞</span>
                <span>+7 (495) 123-45-67</span>
              </li>
              <li>
                <span className="icon">✉️</span>
                <span>info@design360.ru</span>
              </li>
              <li>
                <span className="icon">📍</span>
                <span>г. Москва, ул. Примерная, д. 1</span>
              </li>
              <li>
                <span className="icon">🕒</span>
                <span>Пн-Пт: 9:00-19:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Дизайн360. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
