'use client';

import React, { useState } from 'react';
import CategoriesNav from '@/components/widgets/CategoriesNav/CategoriesNav';
import '@/styles/catalog.css';
import productsData from '@/data/products.json';

const priceFormatter = new Intl.NumberFormat('ru-RU');

export default function CatalogPage() {
    const [activeCategory, setActiveCategory] = useState('Все категории');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        category: '',
    });

    const categoryNavItems = [
        'Все категории',
        'Мебель',
        'Декор',
        'Освещение',
        'Текстиль',
        'Для бизнеса',
    ];

    const products = productsData.products;

    // Фильтрация
    const filteredProducts = products.filter((product) => {
        let match = true;

        if (activeCategory !== 'Все категории') {
            match = match && product.category === activeCategory;
        }

        if (filters.minPrice) {
            match = match && product.price >= parseInt(filters.minPrice);
        }

        if (filters.maxPrice) {
            match = match && product.price <= parseInt(filters.maxPrice);
        }

        return match;
    });

    // Пагинация
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="catalog-page">
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
                    <span>Каталог</span>
                </div>

                <div className="catalog-header">
                    <h1 className="catalog-title">Каталог товаров</h1>
                    <p className="catalog-description">
                        Более 5000 товаров для создания идеального интерьера. Мебель, декор,
                        освещение и текстиль от проверенных производителей.
                    </p>
                </div>

                <div className="catalog-banners">
                    <div className="catalog-banner">
                        <h3>Скидка 20% на первую покупку</h3>
                        <p>Для новых клиентов при заказе от 10 000 ₽</p>
                        <button className="banner-btn">Получить скидку</button>
                    </div>
                    <div
                        className="catalog-banner"
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        }}
                    >
                        <h3>Бесплатная доставка</h3>
                        <p>При заказе от 15 000 ₽ по всей России</p>
                        <button className="banner-btn">Подробнее</button>
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
                                        onChange={(e) =>
                                            setFilters({ ...filters, minPrice: e.target.value })
                                        }
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        id="max-price"
                                        placeholder="100000"
                                        value={filters.maxPrice}
                                        onChange={(e) =>
                                            setFilters({ ...filters, maxPrice: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="category">Категория</label>
                                <select
                                    id="category"
                                    value={filters.category}
                                    onChange={(e) =>
                                        setFilters({ ...filters, category: e.target.value })
                                    }
                                >
                                    <option value="">Все категории</option>
                                    <option value="Мебель">Мебель</option>
                                    <option value="Декор">Декор</option>
                                    <option value="Освещение">Освещение</option>
                                    <option value="Текстиль">Текстиль</option>
                                </select>
                            </div>

                            <button className="filter-btn filter-apply">Применить фильтры</button>
                            <button
                                className="filter-btn filter-reset"
                                onClick={() =>
                                    setFilters({ minPrice: '', maxPrice: '', category: '' })
                                }
                            >
                                Сбросить
                            </button>
                        </div>
                    </aside>

                    <main className="products-area">
                        <div className="products-header">
                            <div className="products-info">
                                <span className="products-count">
                                    Найдено {filteredProducts.length} товаров
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
                            className={`products-grid ${viewMode === 'list' ? 'list-view' : ''
                                }`}
                        >
                            {paginatedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={`product-card ${viewMode === 'list' ? 'list-item' : ''
                                        }`}
                                >
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-description">{product.description}</p>
                                        <div className="product-price">
                                            {priceFormatter.format(product.price)} ₽
                                        </div>
                                        <div className="product-category">{product.category}</div>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn btn-primary">В корзину</button>
                                        <button className="btn btn-outline">Подробнее</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    ‹
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (page) => (
                                        <button
                                            key={page}
                                            className={`pagination-btn ${currentPage === page ? 'active' : ''
                                                }`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    className="pagination-btn"
                                    onClick={() =>
                                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    ›
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
