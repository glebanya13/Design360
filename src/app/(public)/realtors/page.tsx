'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { packagesService, Package } from '@/lib/firebase/services';
import '@/styles/realtors.css';

export default function RealtorsPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {
        try {
            setLoading(true);
            const data = await packagesService.getAll();
            setPackages(data);
        } catch (error) {
            console.error('Ошибка загрузки пакетов:', error);
        } finally {
            setLoading(false);
        }
    };

    // Преобразуем пакеты из Firebase в формат для отображения
    const plans = packages.map((pkg) => {
        const visualizations = typeof pkg.visualizations === 'string' 
            ? pkg.visualizations 
            : pkg.visualizations.toString();
        
        // Парсим цену для извлечения числа и единицы
        // Обрабатываем форматы: "1390 Р", "3 900 Р", "от 1190 Р / шт."
        const hasPriceUnit = pkg.price.includes('/ шт.') || pkg.price.includes('/шт.');
        const hasFromPrefix = pkg.price.toLowerCase().includes('от');
        let priceNumber = '';
        
        if (hasPriceUnit) {
            // Для формата "от 1190 Р / шт." извлекаем число после "от"
            const priceMatch = pkg.price.match(/от\s*(\d[\d\s]*)/i) || pkg.price.match(/(\d[\d\s]*)/);
            priceNumber = priceMatch ? priceMatch[1].replace(/\s/g, '') : '';
        } else {
            // Для обычного формата "1390 Р" или "3 900 Р"
            const priceMatch = pkg.price.match(/(\d[\d\s]*)/);
            priceNumber = priceMatch ? priceMatch[1].replace(/\s/g, '') : '';
        }
        
        // Форматируем цену с пробелами для тысяч
        const formattedPrice = priceNumber ? 
            priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
        
        return {
            id: pkg.id || '',
            title: pkg.name,
            subtitle: pkg.targetAudience,
            qty: visualizations,
            price: formattedPrice,
            pricePrefix: hasFromPrefix ? 'от ' : '',
            priceUnit: hasPriceUnit ? ' / шт.' : '',
            description: pkg.description,
            featured: pkg.highlighted || false,
        };
    });

    const benefits = [
        {
            icon: '🚀',
            title: 'Ускорение продаж',
            description: 'Объекты с визуализацией продаются на 30-50% быстрее, чем без нее',
        },
        {
            icon: '💰',
            title: 'Увеличение стоимости',
            description: 'Покупатели готовы платить больше за объект с понятным потенциалом',
        },
        {
            icon: '🎯',
            title: 'Привлечение клиентов',
            description: 'Визуализация привлекает больше просмотров и откликов на объявления',
        },
        {
            icon: '🏆',
            title: 'Конкурентное преимущество',
            description: 'Выделяйтесь среди других риелторов профессиональным подходом',
        },
    ];

    const processSteps = [
        {
            number: 1,
            title: 'Выберите пакет',
            description: 'Подберите подходящий пакет визуализаций под ваши задачи',
        },
        {
            number: 2,
            title: 'Оплатите заказ',
            description: 'Оплатите выбранный пакет визуализаций онлайн',
        },
        {
            number: 3,
            title: 'Отправьте данные объекта',
            description: 'Загрузите фото объекта и укажите пожелания по ремонту',
        },
        {
            number: 4,
            title: 'Получите визуализации',
            description: 'Через 1 день на каждую визуализацию получите готовые 3D-визуализации',
        },
    ];

    const faqs = [
        {
            question: 'Как происходит оплата?',
            answer: 'Оплата происходит единоразово за выбранный пакет визуализаций. После оплаты вы сможете отправить данные объектов для визуализации.',
        },
        {
            question: 'Сколько визуализаций я получу?',
            answer: 'Количество визуализаций зависит от выбранного пакета: 1, 3, 5 или более (в случае пакета Премиум).',
        },
        {
            question: 'Как долго выполняются визуализации?',
            answer: 'Срок выполнения одной визуализации — 1 день. Если в пакете несколько визуализаций, то они выполняются последовательно, но мы стараемся ускорить процесс при возможности.',
        },
        {
            question: 'Что если мне нужно больше визуализаций, чем в пакете?',
            answer: 'Вы можете докупить дополнительные визуализации или выбрать пакет Премиум, который предлагает оптовые цены.',
        },
    ];

    // Функция для правильного склонения слова "визуализация"
    const getVisualizationWord = (qty: string | number): string => {
        const num = typeof qty === 'string' ? parseInt(qty) : qty;
        
        if (isNaN(num)) {
            // Если это строка типа "10+", используем множественное число
            return 'визуализаций';
        }
        
        // Правила склонения для русского языка
        if (num === 1) {
            return 'визуализация';
        } else if (num >= 2 && num <= 4) {
            return 'визуализации';
        } else {
            return 'визуализаций';
        }
    };

    const getPlanLabel = (plan: typeof plans[0]) => {
        const visWord = getVisualizationWord(plan.qty);
        if (plan.priceUnit) {
            return `${plan.title} — опт. цена ${plan.pricePrefix}${plan.price} ₽/шт.`;
        }
        return `${plan.title} — ${plan.qty} ${visWord}: ${plan.pricePrefix}${plan.price} ₽`;
    };

    if (loading) {
        return (
            <>
                <section className="realtor-hero">
                    <h1>Увеличивайте продажи недвижимости с 3D-визуализацией</h1>
                    <p>
                        Превращайте обычные квартиры в желанные объекты с помощью профессиональной 3D-визуализации. Продавайте
                        быстрее и дороже!
                    </p>
                </section>
                <section className="tariff-pricing-section" id="pricing">
                    <div className="section-header">
                        <h2 className="section-title">Загрузка пакетов...</h2>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            {/* Герой секция для риелторов */}
            <section className="realtor-hero">
                <h1>Увеличивайте продажи недвижимости с 3D-визуализацией</h1>
                <p>
                    Превращайте обычные квартиры в желанные объекты с помощью профессиональной 3D-визуализации. Продавайте
                    быстрее и дороже!
                </p>
                <a href="#pricing" className="tariff-btn" style={{ background: 'white', color: 'var(--primary)' }}>
                    Выбрать пакет
                </a>
            </section>

            {/* Секция тарифов */}
            <section className="tariff-pricing-section" id="pricing">
                <div className="section-header">
                    <h2 className="section-title">Выберите пакет визуализаций</h2>
                    <p className="section-subtitle">
                        Подберите объём под свои задачи — одиночный заказ, небольшие партии для объявлений или
                        массовая поставка для агентства.
                    </p>
                </div>

                <div className="pricing-grid">
                    {plans.map((plan) => (
                        <article
                            key={plan.id}
                            className={`tariff-card ${plan.featured ? 'featured' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
                            onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                        >
                            <div className="tariff-title">{plan.title}</div>
                            <div className="tariff-subtitle">{plan.subtitle}</div>

                            <div className="tariff-features">
                                <div className="tariff-qty">
                                    <strong>{plan.qty}</strong> {getVisualizationWord(plan.qty)}
                                </div>
                                <div className="tariff-price">
                                    {plan.pricePrefix}{plan.price} ₽{plan.priceUnit || ''}
                                </div>
                                <div className="tariff-muted">{plan.description}</div>
                            </div>

                            <button
                                className="tariff-btn tariff-btn-select"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPlan(selectedPlan === plan.id ? null : plan.id);
                                }}
                            >
                                Выбрать
                            </button>
                        </article>
                    ))}
                </div>

                {/* Область оформления заказа */}
                {selectedPlan && (
                    <div className="tariff-order-area active">
                        <p className="selected-info">
                            Вы выбрали: {getPlanLabel(plans.find((p) => p.id === selectedPlan)!)}
                        </p>
                        <Link href="/tz" className="tariff-btn-order">
                            Оформить заказ
                        </Link>
                    </div>
                )}
            </section>

            {/* Преимущества */}
            <section className="benefits-realtor">
                <div className="section-header">
                    <h2 className="section-title">Преимущества для риелторов</h2>
                    <p className="section-subtitle">Как 3D-визуализация помогает в работе с недвижимостью</p>
                </div>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="benefit-icon">{benefit.icon}</div>
                            <h3 className="benefit-title">{benefit.title}</h3>
                            <p className="benefit-description">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Процесс работы */}
            <section className="process-realtor">
                <div className="section-header">
                    <h2 className="section-title">Как это работает</h2>
                    <p className="section-subtitle">Простой процесс от выбора пакета до готовых визуализаций</p>
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

            {/* Партнерская программа */}
            <section className="referral-section">
                <div className="section-header">
                    <h2 className="section-title">Партнерская программа</h2>
                    <p className="section-subtitle">Приводите коллег и экономьте на следующих заказах</p>
                </div>
                <div className="referral-card">
                    <div className="discount-badge">СКИДКА 20%</div>
                    <h3>Приведи друга - получи скидку</h3>
                    <p>
                        Расскажите коллеге-риелтору о нашем сервисе. Если он сделает заказ по вашей рекомендации, вы
                        получите скидку 20% на следующий заказ.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="tariff-btn">Поделиться ссылкой</button>
                        <button className="tariff-btn">Узнать подробности</button>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section">
                <div className="section-header">
                    <h2 className="section-title">Частые вопросы</h2>
                </div>

                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${openFaq === index ? 'active' : ''}`}
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                        <div className="faq-question">
                            <span>{faq.question}</span>
                            <span>{openFaq === index ? '−' : '+'}</span>
                        </div>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* CTA секция */}
            <section className="cta-section">
                <h2 className="cta-title">Начните продавать больше уже сегодня!</h2>
                <p className="cta-description">
                    Присоединяйтесь к сотням риелторов, которые уже используют 3D-визуализацию для увеличения продаж
                </p>
                <a href="#pricing" className="tariff-btn">
                    Выбрать пакет визуализаций
                </a>
            </section>
        </>
    );
}

