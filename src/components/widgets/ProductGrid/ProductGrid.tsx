import React from 'react';
import { Card } from '@/components/ui';
import styles from './ProductGrid.module.css';

export interface Product {
    id: string | number;
    name: string;
    image: string;
    price: string | number;
    oldPrice?: string | number;
    badge?: string;
    category?: string;
    link?: string;
}

export interface ProductGridProps {
    products: Product[];
    columns?: 2 | 3 | 4;
    className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    columns = 3,
    className = '',
}) => {
    return (
        <div className={`${styles.productGrid} ${styles[`columns-${columns}`]} ${className}`}>
            {products.map((product) => (
                <Card
                    key={product.id}
                    title={product.name}
                    description={product.category}
                    image={product.image}
                    imageAlt={product.name}
                    badge={product.badge}
                    onClick={() => product.link && (window.location.href = product.link)}
                    footer={
                        <div className={styles.priceSection}>
                            {product.oldPrice && (
                                <span className={styles.oldPrice}>{product.oldPrice} ₽</span>
                            )}
                            <span className={styles.price}>{product.price} ₽</span>
                        </div>
                    }
                />
            ))}
        </div>
    );
};

export default ProductGrid;




