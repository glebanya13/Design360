'use client';

import React from 'react';
import Link from 'next/link';
import '@/styles/landing.css';

export default function HomePage() {
    return (
        <>
            {/* Герой секция */}
            <section className="main-hero">
                <div className="hero-content">
                    <h1>Проектируем пространства, которые вдохновляют</h1>
                    <p>
                        Гармония экологичных материалов, умных технологий и эргономичного дизайна для жизни будущего
                    </p>
                </div>
            </section>

            {/* Секция деталей */}
            <section className="details-section">
                <div className="details-grid">
                    <div className="detail-card">
                        <div className="detail-icon">👆</div>
                        <h3 className="detail-title">ЭТА ДВЕРНАЯ РУЧКА</h3>
                        <p className="detail-description">
                            Эргономичный дизайн от итальянского бренда с тактильным интеллектуальным управлением.
                            Беспроводная зарядка встроена в основание.
                        </p>
                    </div>
                    <div className="detail-card">
                        <div className="detail-icon">👉</div>
                        <h3 className="detail-title">ЭТИ РОЗЕТКИ</h3>
                        <p className="detail-description">
                            Скрытый монтаж с сенсорным управлением и защитой от перегрузки. Умное распределение
                            энергии и мониторинг потребления.
                        </p>
                    </div>
                    <div className="detail-card">
                        <div className="detail-icon">👇</div>
                        <h3 className="detail-title">ЭТОТ ПОЛ</h3>
                        <p className="detail-description">
                            Натуральное дерево из экологичных источников с интеллектуальной системой подогрева.
                            Автоматическая регуляция температуры по времени суток.
                        </p>
                    </div>
                </div>
            </section>

            {/* Секция ценностей */}
            <section className="values-section">
                <div className="values-container">
                    <h2 className="values-title">Современный подход к дизайну</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <div className="value-icon">🌿</div>
                            <h3 className="value-name">Экологичность</h3>
                            <p className="value-desc">
                                Используем только сертифицированные материалы с низким углеродным следом
                            </p>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">⚡</div>
                            <h3 className="value-name">Энергоэффективность</h3>
                            <p className="value-desc">
                                Умные системы управления энергопотреблением снижают затраты на 30%
                            </p>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">📱</div>
                            <h3 className="value-name">Технологичность</h3>
                            <p className="value-desc">
                                Интеграция IoT устройств для комфортного управления пространством
                            </p>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">🔄</div>
                            <h3 className="value-name">Долговечность</h3>
                            <p className="value-desc">
                                Материалы и решения рассчитаны на 20+ лет беспроблемной эксплуатации
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA секция */}
            <section className="cta-section">
                <h2 className="cta-title">Готовы создать умное пространство?</h2>
                <p className="cta-description">
                    Закажите консультацию и получите индивидуальный проект с учетом современных технологий и
                    экологичных решений
                </p>
                <Link href="/tz" className="cta-button">
                    Обсудить проект
                </Link>
            </section>
        </>
    );
}
