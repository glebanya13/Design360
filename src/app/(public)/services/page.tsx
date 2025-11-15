'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CategoriesNav from '@/components/widgets/CategoriesNav/CategoriesNav';
import { serviceCategoriesService } from '@/lib/firebase/services';
import '@/styles/Services.css';

export default function ServicesPage() {
    const [selectedSection, setSelectedSection] = useState('planning');
    const [categoryNavItems, setCategoryNavItems] = useState<string[]>(['Все услуги']);
    const router = useRouter();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const categories = await serviceCategoriesService.getAll();
            const categoryNames = ['Все услуги', ...categories.map(cat => cat.name)];
            setCategoryNavItems(categoryNames);
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
            // Используем значения по умолчанию при ошибке
            setCategoryNavItems([
                'Все услуги',
                'Дизайн интерьера',
                'Проектирование',
                'Консультации',
                '3D визуализация',
                'Авторский надзор',
                'Для бизнеса',
                'Для профессионалов',
                'Электроснабжение',
            ]);
        }
    };

    const handleCategoryChange = async (category: string) => {
        if (category === 'Все услуги') {
            // Уже на этой странице
            return;
        }
        
        // Ищем категорию с маршрутом
        try {
            const categories = await serviceCategoriesService.getAll();
            const foundCategory = categories.find(cat => cat.name === category);
            
            if (foundCategory?.route) {
                router.push(foundCategory.route);
            } else {
                // Fallback для старых категорий
                if (category === 'Дизайн интерьера') {
                    router.push('/design-interior');
                } else if (category === 'Электроснабжение') {
                    router.push('/elektrosnabzhenie');
                }
            }
        } catch (error) {
            console.error('Ошибка при переходе:', error);
        }
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
    ];

    return (
        <div className="services-page">
            <CategoriesNav
                categories={categoryNavItems}
                activeCategory="Все услуги"
                onCategoryChange={handleCategoryChange}
                type="button"
            />

            <div className="main-container">
                <div className="breadcrumbs">
                    <a href="/">Главная</a>
                    <span>›</span>
                    <span>Услуги</span>
                </div>

                <div className="page-header">
                    <h1 className="page-title">
                        Профессиональные услуги по дизайну и проектированию
                    </h1>
                    <p className="page-description">
                        Полный цикл услуг от концепции до реализации. Решения для частных
                        клиентов, риелторов, дизайнеров, архитекторов и строительных компаний.
                    </p>
                </div>

                {/* Популярные услуги */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Популярные услуги</h2>
                        <a href="#" className="view-all">
                            Все услуги
                        </a>
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
                                        <a href="#" className="btn btn-primary">
                                            Заказать
                                        </a>
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
                            Профессиональные услуги для риелторов, дизайнеров, архитекторов и
                            строительных компаний
                        </h2>
                    </div>
                    <div className="sections-grid">
                        {professionalSections.map((section) => (
                            <div
                                key={section.id}
                                className={`section-card ${selectedSection === section.id ? 'selected' : ''
                                    }`}
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
            </div>
        </div>
    );
}




