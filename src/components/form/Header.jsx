import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="app-header">
      <div className="logo">ДИЗАЙН360</div>
      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger-line ${isMenuOpen ? 'active' : ''}`}></div>
        <div className={`burger-line ${isMenuOpen ? 'active' : ''}`}></div>
        <div className={`burger-line ${isMenuOpen ? 'active' : ''}`}></div>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <a href="/" className="mobile-menu-item">Главная</a>
            <a href="/tz" className="mobile-menu-item">Экспликация</a>
            <a href="/about" className="mobile-menu-item">О нас</a>
            <a href="/contact" className="mobile-menu-item">Контакты</a>
          </div>
        </div>
      )}
    </header>
  );
}
