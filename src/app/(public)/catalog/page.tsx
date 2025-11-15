'use client';

import React, { useState, useEffect } from 'react';
import CategoriesNav from '@/components/widgets/CategoriesNav/CategoriesNav';
import type { Product } from '@/lib/firebase/services';
import '@/styles/catalog.css';

const priceFormatter = new Intl.NumberFormat('ru-RU');

export default function CatalogPage() {
    const [activeCategory, setActiveCategory] = useState('Все категории');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryNavItems, setCategoryNavItems] = useState<string[]>(['Все категории']);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 6;

    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        category: '',
    });

    useEffect(() => {
        // Динамический импорт Firebase только на клиенте
        if (typeof window === 'undefined') {
            return;
        }

        const loadData = async () => {
            try {
                const { catalogCategoriesService, productsService } = await import('@/lib/firebase/services');
                
                // Загружаем категории
                try {
                    const categories = await catalogCategoriesService.getAll();
                    const categoryNames = ['Все категории', ...categories.map((cat: any) => cat.name)];
                    const uniqueCategories = Array.from(new Set(categoryNames));
                    setCategoryNavItems(uniqueCategories);
                } catch (error) {
                    console.error('Ошибка загрузки категорий:', error);
                    setCategoryNavItems(['Все категории', 'Мебель', 'Декор', 'Освещение', 'Текстиль', 'Для бизнеса']);
                }

                // Загружаем продукты
                try {
                    setLoading(true);
                    const data = await productsService.getAll();
                    setProducts(data);
                } catch (error) {
                    console.error('Ошибка загрузки продуктов:', error);
                    setProducts([]);
                } finally {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Ошибка загрузки модулей Firebase:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Фильтрация
    const filteredProducts = products.filter((product) => {
        let match = true;

        // Фильтр по категории (приоритет у фильтров, затем навигация)
        const categoryFilter = filters.category || (activeCategory !== 'Все категории' ? activeCategory : '');
        if (categoryFilter) {
            match = match && product.category === categoryFilter;
        }

        // Фильтр по минимальной цене
        if (filters.minPrice && filters.minPrice !== '') {
            const minPrice = parseInt(filters.minPrice);
            if (!isNaN(minPrice)) {
                match = match && product.price >= minPrice;
            }
        }

        // Фильтр по максимальной цене
        if (filters.maxPrice && filters.maxPrice !== '') {
            const maxPrice = parseInt(filters.maxPrice);
            if (!isNaN(maxPrice)) {
                match = match && product.price <= maxPrice;
            }
        }

        return match;
    });

    const handleApplyFilters = () => {
        if (filters.category) {
            setActiveCategory(filters.category);
        }
        setCurrentPage(1); // Сбрасываем на первую страницу при применении фильтров
    };

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
                                    <div className="price-input-wrapper">
                                        <label htmlFor="min-price" className="price-input-label">От</label>
                                        <input
                                            type="number"
                                            id="min-price"
                                            placeholder="0"
                                            value={filters.minPrice}
                                            onChange={(e) =>
                                                setFilters({ ...filters, minPrice: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="price-input-wrapper">
                                        <label htmlFor="max-price" className="price-input-label">До</label>
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
                                    {categoryNavItems
                                        .filter(cat => cat !== 'Все категории')
                                        .map((cat, index) => (
                                            <option key={`${cat}-${index}`} value={cat}>{cat}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <button 
                                className="filter-btn filter-apply"
                                onClick={handleApplyFilters}
                            >
                                Применить фильтры
                            </button>
                            <button
                                className="filter-btn filter-reset"
                                onClick={() => {
                                    setFilters({ minPrice: '', maxPrice: '', category: '' });
                                    setActiveCategory('Все категории');
                                    setCurrentPage(1);
                                }}
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
                            {loading ? (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                                    Загрузка товаров...
                                </div>
                            ) : paginatedProducts.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                                    Товары не найдены
                                </div>
                            ) : (
                                paginatedProducts.map((product) => (
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
                            ))
                            )}
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
