import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Дизайн360</h3>
                    <p>Профессиональные услуги для создания комфортных и функциональных пространств</p>
                </div>
                <div className="footer-column">
                    <h3>Услуги</h3>
                    <ul>
                        <li>
                            <Link href="/services">Дизайн интерьера</Link>
                        </li>
                        <li>
                            <Link href="/services">3D-визуализация</Link>
                        </li>
                        <li>
                            <Link href="/services">Для риелторов</Link>
                        </li>
                        <li>
                            <Link href="/services">Архитектурные решения</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Компания</h3>
                    <ul>
                        <li>
                            <Link href="/">О нас</Link>
                        </li>
                        <li>
                            <Link href="/">Кейсы</Link>
                        </li>
                        <li>
                            <Link href="/">Отзывы</Link>
                        </li>
                        <li>
                            <Link href="/">Блог</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Контакты</h3>
                    <ul>
                        <li>
                            <a href="tel:+79114934641">+7 (911) 493-46-41</a>
                        </li>
                        <li>
                            <a href="mailto:89114934641@bk.ru">89114934641@bk.ru</a>
                        </li>
                        <li>Калининград, Медовый мост</li>
                        <li>Пн-Пт: 9:00-18:00</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Дизайн360.рф Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
