'use client';

import React from 'react';
import '@/styles/categoriesNav.css';

export interface CategoriesNavProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    type?: 'button' | 'link';
}

export const CategoriesNav: React.FC<CategoriesNavProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    type = 'button',
}) => {
    return (
        <nav className="categories-nav">
            <ul className="categories-list">
                {categories.map((category) => (
                    <li key={category}>
                        <button
                            className={activeCategory === category ? 'active' : ''}
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CategoriesNav;




