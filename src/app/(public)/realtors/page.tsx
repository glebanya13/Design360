'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/realtors.css';

export default function RealtorsPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const plans = [
        {
            id: 'basic',
            title: 'Базовый',
            subtitle: 'Для единичных заказов',
            qty: '1',
            price: '1 390',
            description: 'Оплатите и получите готовый файл JPG/PNG высокого качества',
            featured: false,
        },
        {
            id: 'standard',
            title: 'Стандарт',
            subtitle: 'Для малого агентства',
            qty: '3',
            price: '3 900',
            description: 'Оптимально для 2–3 объектов — выгоднее, чем поштучно',
            featured: false,
        },
        {
            id: 'pro',
            title: 'Профи',
            subtitle: 'Для активных риелторов',
            qty: '5',
            price: '6 250',
            description: 'Лучшее соотношение цена/объём для регулярных показов',
            featured: true,
        },
        {
            id: 'premium',
            title: 'Премиум',
            subtitle: 'Для агентств и постоянных партнёров',
            qty: '10+',
            price: 'от 1 190',
            priceUnit: ' / шт.',
            description:
                'Снижение цены при оптовых партиях — укажите потребность и мы предложим персональное предложение',
            featured: false,
        },
    ];

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

    const getPlanLabel = (plan: typeof plans[0]) => {
        if (plan.id === 'premium') {
            return `${plan.title} — опт. цена от ${plan.price} ₽/шт.`;
        }
        return `${plan.title} — ${plan.qty} визуализация${plan.qty === '1' ? '' : plan.qty === '3' ? 'и' : 'ций'}: ${plan.price} ₽`;
    };

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
                                    <strong>{plan.qty}</strong> визуализация{plan.qty === '1' ? '' : plan.qty === '3' ? 'и' : 'ций'}
                                </div>
                                <div className="tariff-price">
                                    {plan.price} ₽{plan.priceUnit || ''}
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

