import React from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

export interface CardProps {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    badge?: string;
    badgeVariant?: 'new' | 'sale' | 'hit' | 'exclusive';
    footer?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
    title,
    description,
    image,
    imageAlt = '',
    badge,
    badgeVariant = 'new',
    footer,
    onClick,
    className = '',
    children,
    variant = 'default',
}) => {
    const classes = [
        styles.card,
        styles[variant],
        onClick && styles.clickable,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
            {image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                    />
                    {badge && (
                        <span className={`${styles.badge} ${styles[`badge-${badgeVariant}`]}`}>
                            {badge}
                        </span>
                    )}
                </div>
            )}
            <div className={styles.content}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {description && <p className={styles.description}>{description}</p>}
                {children}
            </div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
};

export default Card;




