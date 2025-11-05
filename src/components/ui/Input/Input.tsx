import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    helperText,
    size = 'md',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    className = '',
    disabled,
    ...rest
}, ref) => {
    const wrapperClasses = [
        styles.wrapper,
        fullWidth && styles.fullWidth,
    ].filter(Boolean).join(' ');

    const inputClasses = [
        styles.input,
        styles[size],
        error && styles.error,
        disabled && styles.disabled,
        icon && styles[`with-icon-${iconPosition}`],
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClasses}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {rest.required && <span className={styles.required}>*</span>}
                </label>
            )}

            <div className={styles.inputWrapper}>
                {icon && iconPosition === 'left' && (
                    <span className={`${styles.icon} ${styles.iconLeft}`}>
                        {icon}
                    </span>
                )}

                <input
                    ref={ref}
                    className={inputClasses}
                    disabled={disabled}
                    {...rest}
                />

                {icon && iconPosition === 'right' && (
                    <span className={`${styles.icon} ${styles.iconRight}`}>
                        {icon}
                    </span>
                )}
            </div>

            {error && <span className={styles.errorText}>{error}</span>}
            {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;




