import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎨</span>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Дизайн360</Link>
          </div>
          <nav>
            <ul>
              <li><a href="#services">Услуги</a></li>
              <li><a href="#portfolio">Портфолио</a></li>
              <li><a href="#process">Процесс</a></li>
              <li><a href="#about">О нас</a></li>
              <li><a href="#contact">Контакты</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <Link to="/tz" className="btn btn-primary">Техническое задание</Link>
          </div>
        </div>
      </div>
    </header>
  );
}


