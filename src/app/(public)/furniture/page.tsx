'use client';

import React, { useState } from 'react';
import CategoriesNav from '@/components/widgets/CategoriesNav/CategoriesNav';
import '@/styles/catalog.css';

export default function FurniturePage() {
    const [activeCategory, setActiveCategory] = useState('Вся мебель');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        category: '',
        style: '',
        material: '',
        color: '',
        brand: '',
    });

    const categoryNavItems = [
        'Вся мебель',
        'Диваны',
        'Кресла',
        'Столы',
        'Стулья',
        'Кровати',
        'Шкафы',
        'Комоды',
        'Полки',
    ];

    // Примерные данные мебели
    const furniture = [
        {
            id: 1,
            name: "Диван 'Комфорт'",
            price: 45000,
            category: 'Диваны',
            image: '/images/sofa.svg',
            description: 'Удобный диван для гостиной',
        },
        {
            id: 2,
            name: "Кресло 'Уют'",
            price: 18000,
            category: 'Кресла',
            image: '/images/chairs.svg',
            description: 'Мягкое кресло для отдыха',
        },
        {
            id: 3,
            name: "Стол 'Рабочий'",
            price: 25000,
            category: 'Столы',
            image: '/images/table.svg',
            description: 'Письменный стол из дерева',
        },
    ];

    // Фильтрация
    const filteredFurniture = furniture.filter((item) => {
        let match = true;
        if (activeCategory !== 'Вся мебель') {
            match = match && item.category === activeCategory;
        }
        if (filters.minPrice) {
            match = match && item.price >= parseInt(filters.minPrice);
        }
        if (filters.maxPrice) {
            match = match && item.price <= parseInt(filters.maxPrice);
        }
        return match;
    });

    const totalPages = Math.ceil(filteredFurniture.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFurniture = filteredFurniture.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleFilterChange = (field: string, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const resetFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            category: '',
            style: '',
            material: '',
            color: '',
            brand: '',
        });
    };

    return (
        <div className="furniture-page">
            <CategoriesNav
                categories={categoryNavItems}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                type="button"
            />

            <div className="main-container">
                <div className="breadcrumbs">
                    <a href="/">Главная</a>
                    <span>›</span>
                    <a href="/catalog">Каталог</a>
                    <span>›</span>
                    <span>Мебель</span>
                </div>

                <div className="catalog-header">
                    <h1 className="catalog-title">Мебель для дома и офиса</h1>
                    <p className="catalog-description">
                        Более 1800 предметов мебели от ведущих производителей. Диваны, кресла,
                        столы, стулья, кровати и многое другое для создания комфортного
                        интерьера.
                    </p>
                </div>

                <div className="catalog-banners">
                    <div className="catalog-banner">
                        <h3>Сборка мебели в подарок</h3>
                        <p>При покупке мебели на сумму от 25 000 ₽</p>
                        <button className="banner-btn">Подробнее</button>
                    </div>
                    <div
                        className="catalog-banner"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                    >
                        <h3>Экологичные материалы</h3>
                        <p>Мебель из натурального дерева и безопасных материалов</p>
                        <button className="banner-btn">Узнать больше</button>
                    </div>
                </div>

                <div className="main-content">
                    <aside className="sidebar">
                        <div className="filters">
                            <h3>Фильтры</h3>

                            <div className="filter-group">
                                <label htmlFor="price-range">Цена, ₽</label>
                                <div className="price-inputs">
                                    <input
                                        type="number"
                                        id="min-price"
                                        placeholder="0"
                                        value={filters.minPrice}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        id="max-price"
                                        placeholder="500000"
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="category">Тип мебели</label>
                                <select
                                    id="category"
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                >
                                    <option value="">Все типы</option>
                                    <option value="Диваны">Диваны</option>
                                    <option value="Кресла">Кресла</option>
                                    <option value="Столы">Столы</option>
                                    <option value="Стулья">Стулья</option>
                                    <option value="Кровати">Кровати</option>
                                    <option value="Шкафы">Шкафы</option>
                                </select>
                            </div>

                            <button className="filter-btn filter-apply">Применить фильтры</button>
                            <button className="filter-btn filter-reset" onClick={resetFilters}>
                                Сбросить
                            </button>
                        </div>
                    </aside>

                    <main className="products-area">
                        <div className="products-header">
                            <div className="products-info">
                                <span className="products-count">
                                    Найдено {filteredFurniture.length} товаров
                                </span>
                                <span className="products-sort">
                                    Страница {currentPage} из {totalPages}
                                </span>
                            </div>
                            <div className="view-options">
                                <button
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    Сетка
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    Список
                                </button>
                            </div>
                        </div>

                        <div
                            className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}
                        >
                            {paginatedFurniture.map((item) => (
                                <div
                                    key={item.id}
                                    className={`product-card ${viewMode === 'list' ? 'list-item' : ''}`}
                                >
                                    <div className="product-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{item.name}</h3>
                                        <p className="product-description">{item.description}</p>
                                        <div className="product-price">{item.price.toLocaleString()} ₽</div>
                                        <div className="product-category">{item.category}</div>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn btn-primary">В корзину</button>
                                        <button className="btn btn-outline">Подробнее</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}




