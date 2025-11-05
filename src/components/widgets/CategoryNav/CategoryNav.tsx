'use client';

import React, { useState } from 'react';
import styles from './CategoryNav.module.css';

export interface Category {
    id: string | number;
    name: string;
    count?: number;
}

export interface CategoryNavProps {
    categories: Category[];
    activeCategory?: string | number;
    onCategoryChange?: (categoryId: string | number) => void;
    type?: 'tabs' | 'pills' | 'buttons';
    className?: string;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    type = 'tabs',
    className = '',
}) => {
    const [active, setActive] = useState(activeCategory || categories[0]?.id);

    const handleCategoryClick = (categoryId: string | number) => {
        setActive(categoryId);
        onCategoryChange?.(categoryId);
    };

    return (
        <nav className={`${styles.categoryNav} ${styles[type]} ${className}`}>
            <div className={styles.container}>
                <div className={styles.categories}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.category} ${active === category.id ? styles.active : ''
                                }`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <span className={styles.categoryName}>{category.name}</span>
                            {category.count !== undefined && (
                                <span className={styles.categoryCount}>({category.count})</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default CategoryNav;




