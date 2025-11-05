"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/electrosnabzhenie.css";
import { Breadcrumbs } from "@/components/ui";
import { CategoriesNav } from "@/components/widgets";

export default function ElektrosnabzheniePage() {
	const router = useRouter();

	useEffect(() => {
		document.title =
			"⚡ Проектирование и монтаж электроснабжения | Комплексные решения для дома и бизнеса | Дизайн360";
	}, []);

	const [activeSegment, setActiveSegment] = useState<"individuals" | "business" | "developers">(
		"individuals"
	);

	const [activeCategory, setActiveCategory] = useState<string>("Электроснабжение");
	const categories = [
		"Все услуги",
		"Дизайн интерьера",
		"Проектирование",
		"Консультации",
		"3D визуализация",
		"Авторский надзор",
		"Для бизнеса",
		"Для профессионалов",
		"Электроснабжение",
	];

	const handleCategoryChange = (category: string) => {
		if (category === "Электроснабжение") {
			// Уже на этой странице
			return;
		} else if (category === "Дизайн интерьера") {
			router.push("/design-interior");
		} else if (category === "Все услуги") {
			router.push("/services");
		}
		// Для остальных категорий можно добавить переходы по мере необходимости
	};

	const onSelectPackage = (packageName: string) => {
		alert(
			`Пакет "${packageName}" добавлен в ваш список выбранных услуг! Наш менеджер свяжется с вами для уточнения деталей.`
		);
	};

	const onSegmentCTA = (segmentTitle: string) => {
		alert(
			`Спасибо за ваш интерес к услугам "${segmentTitle}"! Наш специалист свяжется с вами в течение 2 часов.`
		);
	};

	const onCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		alert(
			"Спасибо за вашу заявку! Наш специалист свяжется с вами в ближайшее время для консультации."
		);
	};

	return (
		<div className="electrosnabzhenie-page">
			<CategoriesNav
				categories={categories}
				activeCategory={activeCategory}
				onCategoryChange={handleCategoryChange}
			/>

			<div className="main-container">
				<Breadcrumbs
					items={[
						{ label: "Главная", href: "/" },
						{ label: "Электроснабжение" },
					]}
				/>

				<div className="page-header">
					<h1 className="page-title">⚡ Проектирование и монтаж электроснабжения</h1>
					<p className="page-description">
						Проектируем и монтируем системы электроснабжения, которые работают без сбоев. От
						частного дома до торгового центра. Гарантируем прохождение согласований и
						прозрачную смету. Ваша надежность — наша работа.
					</p>
				</div>

				{/* Сегменты клиентов */}
				<div className="client-segments">
					<div
						className={`segment-card ${activeSegment === "individuals" ? "active" : ""}`}
						onClick={() => setActiveSegment("individuals")}
					>
						<div className="segment-icon">🏠</div>
						<h3 className="segment-title">Для частных лиц</h3>
						<p className="segment-description">
							Строите дом или делаете ремонт в квартире? Создадим безопасную и надежную
							электрическую систему, которая будет служить годами.
						</p>
						<ul className="segment-features">
							<li>Электроснабжение частного дома</li>
							<li>Ремонт и замена электропроводки</li>
							<li>Умный свет и автоматизация</li>
							<li>Заземление и защита от перенапряжений</li>
						</ul>
						<button
							className="btn btn-primary btn-block"
							onClick={(e) => {
								e.stopPropagation();
								onSegmentCTA("Для частных лиц");
							}}
						>
							Обсудить мой проект
						</button>
					</div>

					<div
						className={`segment-card ${activeSegment === "business" ? "active" : ""}`}
						onClick={() => setActiveSegment("business")}
					>
						<div className="segment-icon">🏢</div>
						<h3 className="segment-title">Для бизнеса</h3>
						<p className="segment-description">
							Открываете кафе, офис или магазин? Обеспечим бесперебойное энергоснабжение вашего
							бизнеса с учетом специфики оборудования.
						</p>
						<ul className="segment-features">
							<li>Электроснабжение коммерческих помещений</li>
							<li>Подключение мощного оборудования</li>
							<li>Аварийное и резервное питание</li>
							<li>Согласование с энергоснабжающими организациями</li>
						</ul>
						<button
							className="btn btn-primary btn-block"
							onClick={(e) => {
								e.stopPropagation();
								onSegmentCTA("Для бизнеса");
							}}
						>
							Получить коммерческое предложение
						</button>
					</div>

					<div
						className={`segment-card ${activeSegment === "developers" ? "active" : ""}`}
						onClick={() => setActiveSegment("developers")}
					>
						<div className="segment-icon">🏗</div>
						<h3 className="segment-title">Для девелоперов и подрядчиков</h3>
						<p className="segment-description">
							Строите многоквартирный дом или торговый центр? Выполним полный цикл работ от
							проекта до сдачи &quot;под ключ&quot;.
						</p>
						<ul className="segment-features">
							<li>Комплексное проектирование МКД и ТЦ</li>
							<li>Сопровождение госзакупок (44-ФЗ)</li>
							<li>Проектно-изыскательские работы (ПИР)</li>
							<li>Электроснабжение промышленных объектов</li>
						</ul>
						<button
							className="btn btn-primary btn-block"
							onClick={(e) => {
								e.stopPropagation();
								onSegmentCTA("Для девелоперов и подрядчиков");
							}}
						>
							Обсудить сотрудничество
						</button>
					</div>
				</div>

				{/* Контент для частных лиц */}
				<div
					className={`client-content ${activeSegment === "individuals" ? "active" : ""}`}
					id="individuals-content"
				>
					<div className="section-header">
						<h2 className="section-title">Пакеты услуг для частных лиц</h2>
						<p>Выберите готовое решение или закажите индивидуальный расчет</p>
					</div>

					<div className="packages-grid">
						<div className="package-card">
							<h3 className="package-title">Базовый</h3>
							<div className="package-price">от 25 000 ₽</div>
							<ul className="package-features">
								<li>Проект электроснабжения квартиры</li>
								<li>Схема расположения розеток и выключателей</li>
								<li>Расчет нагрузок и сечений кабелей</li>
								<li className="disabled">Проект заземления и молниезащиты</li>
								<li className="disabled">Смета на материалы</li>
								<li className="disabled">Авторский надзор</li>
							</ul>
							<button
								className="btn btn-outline btn-block"
								onClick={() => onSelectPackage("Базовый")}
							>
								Выбрать пакет
							</button>
						</div>

						<div className="package-card featured">
							<div className="package-badge">Популярный</div>
							<h3 className="package-title">Комфорт</h3>
							<div className="package-price">от 45 000 ₽</div>
							<ul className="package-features">
								<li>Проект электроснабжения дома</li>
								<li>Схема расположения розеток и выключателей</li>
								<li>Расчет нагрузок и сечений кабелей</li>
								<li>Проект заземления и молниезащиты</li>
								<li>Смета на материалы</li>
								<li className="disabled">Авторский надзор</li>
							</ul>
							<button
								className="btn btn-primary btn-block"
								onClick={() => onSelectPackage("Комфорт")}
							>
								Выбрать пакет
							</button>
						</div>

						<div className="package-card">
							<h3 className="package-title">Премиум</h3>
							<div className="package-price">от 75 000 ₽</div>
							<ul className="package-features">
								<li>Проект электроснабжения дома</li>
								<li>Схема расположения розеток и выключателей</li>
								<li>Расчет нагрузок и сечений кабелей</li>
								<li>Проект заземления и молниезащиты</li>
								<li>Смета на материалы</li>
								<li>Авторский надзор (2 выезда)</li>
							</ul>
							<button
								className="btn btn-outline btn-block"
								onClick={() => onSelectPackage("Премиум")}
							>
								Выбрать пакет
							</button>
						</div>
					</div>

					{/* Кейсы для частных лиц */}
					<div className="cases-section">
						<div className="section-header">
							<h2 className="section-title">Реализованные проекты для частных клиентов</h2>
						</div>
						<div className="cases-grid">
							<div className="case-card">
								<div className="case-image">Фото проекта: Электроснабжение коттеджа 250м²</div>
								<h3 className="case-title">Коттедж в Подмосковье</h3>
								<p className="case-description">
									Полный проект электроснабжения загородного дома с системой резервного питания и
									умным светом.
								</p>
								<div className="case-stats">
									<div className="case-stat">📏 250 м²</div>
									<div className="case-stat">⏱ 3 недели</div>
									<div className="case-stat">💰 68 000 ₽</div>
								</div>
							</div>
							<div className="case-card">
								<div className="case-image">
									Фото проекта: Реконструкция электропроводки в хрущевке
								</div>
								<h3 className="case-title">Ремонт в панельном доме</h3>
								<p className="case-description">
									Полная замена электропроводки в 3-комнатной квартире с разработкой новой схемы
									электроснабжения.
								</p>
								<div className="case-stats">
									<div className="case-stat">📏 65 м²</div>
									<div className="case-stat">⏱ 2 недели</div>
									<div className="case-stat">💰 32 000 ₽</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Контент для бизнеса */}
				<div
					className={`client-content ${activeSegment === "business" ? "active" : ""}`}
					id="business-content"
				>
					<div className="section-header">
						<h2 className="section-title">Решения для вашего бизнеса</h2>
						<p>Специализированные пакеты услуг для коммерческих объектов</p>
					</div>

					<div className="packages-grid">
						<div className="package-card">
							<h3 className="package-title">Старт</h3>
							<div className="package-price">от 50 000 ₽</div>
							<ul className="package-features">
								<li>Проект электроснабжения офиса/магазина</li>
								<li>Схема расположения электроточек</li>
								<li>Расчет нагрузок для торгового оборудования</li>
								<li className="disabled">Проект аварийного освещения</li>
								<li className="disabled">Согласование с энергосбытом</li>
							</ul>
							<button
								className="btn btn-outline btn-block"
								onClick={() => onSelectPackage("Старт")}
							>
								Получить КП
							</button>
						</div>

						<div className="package-card featured">
							<div className="package-badge">Бизнес</div>
							<h3 className="package-title">Оптимальный</h3>
							<div className="package-price">от 85 000 ₽</div>
							<ul className="package-features">
								<li>Проект электроснабжения кафе/ресторана</li>
								<li>Схема расположения электроточек</li>
								<li>Расчет нагрузок для кухонного оборудования</li>
								<li>Проект аварийного освещения</li>
								<li>Согласование с энергосбытом</li>
							</ul>
							<button
								className="btn btn-primary btn-block"
								onClick={() => onSelectPackage("Оптимальный")}
							>
								Получить КП
							</button>
						</div>
					</div>
				</div>

				{/* Контент для девелоперов */}
				<div
					className={`client-content ${activeSegment === "developers" ? "active" : ""}`}
					id="developers-content"
				>
					<div className="section-header">
						<h2 className="section-title">Комплексные решения для девелоперов</h2>
						<p>Полный цикл работ от проектирования до сдачи объекта</p>
					</div>

					<div className="packages-grid">
						<div className="package-card">
							<h3 className="package-title">Проектирование</h3>
							<div className="package-price">от 300 000 ₽</div>
							<ul className="package-features">
								<li>Разработка ПИР для МКД/ТЦ</li>
								<li>Согласование с госорганами</li>
								<li>Исполнительная документация</li>
								<li className="disabled">Авторский надзор</li>
								<li className="disabled">Сопровождение строительства</li>
							</ul>
							<button
								className="btn btn-outline btn-block"
								onClick={() => onSelectPackage("Проектирование")}
							>
								Обсудить проект
							</button>
						</div>

						<div className="package-card featured">
							<div className="package-badge">Под ключ</div>
							<h3 className="package-title">Комплексный</h3>
							<div className="package-price">от 650 000 ₽</div>
							<ul className="package-features">
								<li>Разработка ПИР для МКД/ТЦ</li>
								<li>Согласование с госорганами</li>
								<li>Исполнительная документация</li>
								<li>Авторский надзор</li>
								<li>Сопровождение строительства</li>
							</ul>
							<button
								className="btn btn-primary btn-block"
								onClick={() => onSelectPackage("Комплексный")}
							>
								Обсудить проект
							</button>
						</div>
					</div>
				</div>

				{/* Секция преимуществ */}
				<section className="benefits">
					<div className="benefits-grid">
						<div className="benefit-item">
							<div className="benefit-icon">⚡</div>
							<h3 className="benefit-title">Профессиональное проектирование</h3>
							<p className="benefit-description">
								Создаем проекты любой сложности с учетом всех нормативов и требований безопасности
							</p>
						</div>
						<div className="benefit-item">
							<div className="benefit-icon">🔧</div>
							<h3 className="benefit-title">Качественный монтаж</h3>
							<p className="benefit-description">
								Работаем с современным оборудованием и гарантируем долговечность установленных систем
							</p>
						</div>
						<div className="benefit-item">
							<div className="benefit-icon">📋</div>
							<h3 className="benefit-title">Полный комплекс услуг</h3>
							<p className="benefit-description">От проектирования до обслуживания — все в одном месте</p>
						</div>
						<div className="benefit-item">
							<div className="benefit-icon">💼</div>
							<h3 className="benefit-title">Гарантия результата</h3>
							<p className="benefit-description">Фиксированная цена и сроки в договоре</p>
						</div>
					</div>
				</section>

				{/* CTA секция */}
				<section className="cta-section">
					<h2 className="cta-title">Нужна консультация по электроснабжению?</h2>
					<p className="cta-description">
						Оставьте заявку и получите бесплатную консультацию от нашего специалиста. Обсудим ваши задачи
						и предложим оптимальное решение.
					</p>
					<div className="cta-buttons">
						<Link href="/tz" className="btn" style={{ background: "white", color: "var(--primary)" }}>
							Оставить заявку
						</Link>
						<a href="#" className="btn btn-outline" style={{ color: "white", borderColor: "white" }} onClick={onCTA}>
							Записаться на консультацию
						</a>
					</div>
				</section>
			</div>
		</div>
	);
}
