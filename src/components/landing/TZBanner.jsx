import React from 'react';
import { Link } from 'react-router-dom';

export default function TZBanner() {
  return (
    <section id="tz" className="container">
      <div className="tz-banner">
        <h2 style={{ color: 'white' }}>Техническое задание дизайнеру</h2>
        <p>Заполните подробное ТЗ и получите точный расчет стоимости и сроков реализации вашего проекта</p>
        <Link to="/tz" className="btn btn-primary">Заполнить ТЗ онлайн</Link>
      </div>
    </section>
  );
}


