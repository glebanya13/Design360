import React from 'react';
import { Link } from 'react-router-dom';

export default function TZBanner() {
  return (
    <section id="tz" className="container">
      <div className="tz-banner">
        <h2 style={{ color: 'white' }}>Экспликация помещений по ГОСТ</h2>
        <p>Создайте экспликацию помещений в соответствии с ГОСТ 21.501-2018 для точного расчета площадей и планировки</p>
        <Link to="/tz" className="btn btn-primary">Создать экспликацию</Link>
      </div>
    </section>
  );
}


