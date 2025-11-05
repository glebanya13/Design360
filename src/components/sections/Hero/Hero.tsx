'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1>Техническое задание дизайнеру</h1>
                    <p>
                        Профессиональные услуги дизайна интерьеров, архитектурные и инженерные решения. Создаем
                        функциональные и эстетичные пространства под ключ.
                    </p>
                    <div className="hero-actions">
                        <Link href="/tz" className="btn btn-accent">
                            Заполнить ТЗ
                        </Link>
                        <Link href="#portfolio" className="btn btn-outline">
                            Смотреть работы
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
