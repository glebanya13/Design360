'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CategoriesNav from '@/components/widgets/CategoriesNav/CategoriesNav';
import '@/styles/Services.css';

export default function DesignInteriorPage() {
    const [selectedSection, setSelectedSection] = useState('design');
    const router = useRouter();

    const categoryNavItems = [
        'Все услуги',
        'Дизайн интерьера',
        'Проектирование',
        'Консультации',
        '3D визуализация',
        'Авторский надзор',
        'Для бизнеса',
        'Для профессионалов',
        'Электроснабжение',
    ];

    const handleCategoryChange = (category: string) => {
        if (category === 'Дизайн интерьера') {
            // Уже на этой странице
            return;
        } else if (category === 'Электроснабжение') {
            router.push('/elektrosnabzhenie');
        } else if (category === 'Все услуги') {
            router.push('/services');
        }
        // Для остальных категорий можно добавить переходы по мере необходимости
    };

    const popularServices = [
        {
            id: 1,
            title: 'Полный дизайн-проект',
            description:
                'Комплексное решение от планировки до подбора всех материалов и мебели. Идеально для полного преображения пространства.',
            features: [
                'Обмерный план и планировочное решение',
                '3D визуализация всех помещений',
                'Подбор всех материалов и мебели',
                'Чертежи для строителей',
                'Авторский надзор (2 выезда)',
            ],
            price: 'от 2 500 ₽/м²',
            image: '/images/sofas.svg',
        },
        {
            id: 2,
            title: 'Консультация дизайнера',
            description:
                'Профессиональный совет по планировке, цветам, материалам и расстановке мебели. Поможем избежать ошибок.',
            features: [
                'Анализ планировки и функциональности',
                'Рекомендации по цветовой палитре',
                'Советы по выбору мебели и материалов',
                'Ответы на все ваши вопросы',
                'Письменное заключение после консультации',
            ],
            price: '5 900 ₽',
            image: '/images/lighting.svg',
        },
        {
            id: 3,
            title: '3D визуализация интерьера',
            description:
                'Реалистичные 3D-визуализации вашего будущего интерьера. Увидите результат до начала ремонта.',
            features: [
                'Фотореалистичные изображения',
                'Варианты в разных ракурсах',
                'Корректировки по вашему желанию',
                'Подбор материалов и текстур',
                'Расстановка мебели и освещения',
            ],
            price: 'от 1 500 ₽/изображение',
            image: '/images/tables.svg',
        },
    ];

    const additionalServices = [
        {
            id: 4,
            title: 'Авторский надзор',
            description: 'Контроль за реализацией дизайн-проекта на всех этапах ремонта.',
            features: [
                'Регулярные выезды на объект',
                'Контроль качества работ',
                'Решение возникающих вопросов',
                'Взаимодействие со строителями',
            ],
            price: 'от 1 500 ₽/выезд',
            image: '/images/sofas.svg',
        },
        {
            id: 5,
            title: 'Комплектация интерьера',
            description: 'Помощь в подборе и заказе мебели, освещения, текстиля и декора.',
            features: [
                'Подбор мебели по бюджету',
                'Заказ и контроль доставки',
                'Помощь с возвратами и обменами',
                'Расстановка на объекте',
            ],
            price: '15% от стоимости заказа',
            image: '/images/tables.svg',
        },
        {
            id: 6,
            title: 'Дизайн для бизнеса',
            description: 'Создание функциональных и эстетичных пространств для коммерческих помещений.',
            features: ['Кафе, рестораны, бары', 'Офисы и коворкинги', 'Магазины и шоу-румы', 'Гостиницы и апартаменты'],
            price: 'от 3 000 ₽/м²',
            image: '/images/lighting.svg',
        },
    ];

    const professionalSections = [
        { id: 'design', icon: '🎨', name: 'Дизайн интерьера', desc: '3D-визуализация, подбор мебели' },
        { id: 'planning', icon: '📐', name: 'Планировочные решения', desc: 'Зонирование, расстановка мебели' },
        { id: 'ar', icon: '🏗️', name: 'Архитектурные решения (АР)', desc: 'Конструктивные решения, фасады' },
        { id: 'kr', icon: '🏢', name: 'Конструктивные решения (КР)', desc: 'Расчеты, узлы, чертежи' },
        { id: 'water', icon: '🚿', name: 'Водоснабжение и канализация', desc: 'ХВС, ГВС, канализация' },
        { id: 'heating', icon: '🔥', name: 'Отопление', desc: 'Радиаторы, теплые полы' },
        { id: 'ventilation', icon: '💨', name: 'Вентиляция', desc: 'Приточная, вытяжная системы' },
        { id: 'ac', icon: '❄️', name: 'Кондиционирование', desc: 'Сплит-системы, мультизональные' },
        { id: 'electrics', icon: '⚡', name: 'Электроснабжение', desc: 'Электрика, освещение, слаботочка' },
        { id: 'cctv', icon: '📹', name: 'Видеонаблюдение', desc: 'Камеры, система записи' },
        { id: 'spa', icon: '🧖', name: 'СПА-зона', desc: 'Сауна, хамам, бассейн' },
        { id: 'soundproof', icon: '🔇', name: 'Шумоизоляция', desc: 'Звукопоглощающие материалы' },
        { id: 'fire-safety', icon: '🚒', name: 'Противопожарные системы', desc: 'Пожарная сигнализация, пожаротушение' },
        { id: 'security', icon: '🔒', name: 'Системы безопасности', desc: 'Контроль доступа, охранные системы' },
        { id: 'landscape', icon: '🌳', name: 'Ландшафтное проектирование', desc: 'Озеленение, благоустройство территории' },
        { id: 'facade', icon: '🏛️', name: 'Фасадные решения', desc: 'Вентилируемые фасады, отделка' },
        { id: 'construction', icon: '👷', name: 'Проект организации строительства (ПОС)', desc: 'Организация стройплощадки, графики работ' },
        { id: 'works', icon: '🛠️', name: 'Проект производства работ (ППР)', desc: 'Технология выполнения работ, ТБ' },
    ];

    const benefits = [
        {
            icon: '🏆',
            title: 'Опытные специалисты',
            description: 'Более 50 дизайнеров и инженеров с опытом работы от 5 лет',
        },
        {
            icon: '💼',
            title: 'Гарантия результата',
            description: 'Фиксированная цена и сроки в договоре',
        },
        {
            icon: '🔄',
            title: 'Полный цикл',
            description: 'От концепции до реализации и авторского надзора',
        },
        {
            icon: '💰',
            title: 'Экономия до 30%',
            description: 'Помогаем избежать ошибок и лишних трат',
        },
    ];

    const processSteps = [
        {
            number: 1,
            title: 'Консультация',
            description: 'Обсуждаем ваши пожелания, бюджет и сроки',
        },
        {
            number: 2,
            title: 'Концепция',
            description: 'Разрабатываем планировку и стилевое решение',
        },
        {
            number: 3,
            title: 'Визуализация',
            description: 'Создаем 3D-визуализации будущего интерьера',
        },
        {
            number: 4,
            title: 'Реализация',
            description: 'Контролируем процесс и помогаем с закупками',
        },
    ];

    const testimonials = [
        {
            content:
                '"Заказывала дизайн-проект квартиры. Результат превзошел ожидания! Особенно хочу отметить внимание к деталям и помощь в подборе материалов."',
            author: 'Марина, 32 года',
            role: 'Дизайн-проект квартиры',
        },
        {
            content:
                '"Как IT-специалист, ценю четкость и структурированность. Процесс был организован идеально, все этапы и сроки соблюдены. Интерьер получился современным и функциональным."',
            author: 'Артем, 28 лет',
            role: 'Дизайн первой квартиры',
        },
        {
            content:
                '"Обратилась для оформления кафе. Учли все нюансы бизнеса, создали уютную атмосферу, которая нравится гостям. Отдельное спасибо за работу в рамках бюджета."',
            author: 'Ольга, 45 лет',
            role: 'Дизайн кафе',
        },
    ];

    return (
        <div className="services-page">
            <CategoriesNav
                categories={categoryNavItems}
                activeCategory="Дизайн интерьера"
                onCategoryChange={handleCategoryChange}
                type="button"
            />

            <div className="main-container">
                <div className="breadcrumbs">
                    <Link href="/">Главная</Link>
                    <span>›</span>
                    <span>Дизайн интерьера</span>
                </div>

                <div className="page-header">
                    <h1 className="page-title">Профессиональные услуги по дизайну и проектированию</h1>
                    <p className="page-description">
                        Полный цикл услуг от концепции до реализации. Решения для частных клиентов, риелторов,
                        дизайнеров, архитекторов и строительных компаний.
                    </p>
                </div>

                {/* Популярные услуги */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Популярные услуги</h2>
                        <Link href="/services" className="view-all">
                            Все услуги
                        </Link>
                    </div>
                    <div className="services-grid">
                        {popularServices.map((service) => (
                            <div key={service.id} className="service-card">
                                <img src={service.image} alt={service.title} className="service-image" />
                                <div className="service-content">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                    <div className="service-price">{service.price}</div>
                                    <div className="service-actions">
                                        <Link href="/tz" className="btn btn-primary">
                                            Заказать
                                        </Link>
                                        <a href="#" className="btn btn-outline">
                                            Подробнее
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Профессиональные услуги */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">
                            Профессиональные услуги для риелторов, дизайнеров, архитекторов и строительных компаний
                        </h2>
                    </div>
                    <div className="sections-grid">
                        {professionalSections.map((section) => (
                            <div
                                key={section.id}
                                className={`section-card ${selectedSection === section.id ? 'selected' : ''}`}
                                onClick={() => setSelectedSection(section.id)}
                            >
                                <div className="section-icon">{section.icon}</div>
                                <div className="section-name">{section.name}</div>
                                <div className="section-desc">{section.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Детальная информация о выбранной секции */}
                <section className="section">
                    <div className="section-details">
                        <h3 className="details-title">
                            {professionalSections.find((s) => s.id === selectedSection)?.name}
                        </h3>
                        <p className="details-description">
                            Подробная информация о выбранной услуге будет отображаться здесь.
                        </p>
                        <div className="details-actions">
                            <Link href="/tz" className="btn btn-primary">
                                Заказать услугу
                            </Link>
                            <a href="#" className="btn btn-outline">
                                Получить консультацию
                            </a>
                        </div>
                    </div>
                </section>

                {/* Преимущества */}
                <section className="benefits">
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="benefit-item">
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-description">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Процесс работы */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Как мы работаем</h2>
                    </div>
                    <div className="process-steps">
                        {processSteps.map((step) => (
                            <div key={step.number} className="process-step">
                                <div className="step-number">{step.number}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Дополнительные услуги */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Дополнительные услуги</h2>
                    </div>
                    <div className="services-grid">
                        {additionalServices.map((service) => (
                            <div key={service.id} className="service-card">
                                <img src={service.image} alt={service.title} className="service-image" />
                                <div className="service-content">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                    <div className="service-price">{service.price}</div>
                                    <div className="service-actions">
                                        <Link href="/tz" className="btn btn-primary">
                                            Заказать
                                        </Link>
                                        <a href="#" className="btn btn-outline">
                                            Подробнее
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Отзывы */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Отзывы клиентов</h2>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <p className="testimonial-content">{testimonial.content}</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">AV</div>
                                    <div className="author-info">
                                        <div className="author-name">{testimonial.author}</div>
                                        <div className="author-role">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA секция */}
                <section className="cta-section">
                    <h2 className="cta-title">Готовы преобразить ваше пространство?</h2>
                    <p className="cta-description">
                        Оставьте заявку и получите бесплатную консультацию от нашего специалиста. Обсудим ваши идеи и
                        предложим оптимальное решение.
                    </p>
                    <div className="cta-buttons">
                        <Link href="/tz" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>
                            Оставить заявку
                        </Link>
                        <a href="#" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                            Записаться на консультацию
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}

