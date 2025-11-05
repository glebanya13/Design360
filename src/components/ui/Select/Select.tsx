import React, { forwardRef } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    helperText,
    options,
    placeholder,
    size = 'md',
    fullWidth = false,
    className = '',
    disabled,
    ...rest
}, ref) => {
    const wrapperClasses = [
        styles.wrapper,
        fullWidth && styles.fullWidth,
    ].filter(Boolean).join(' ');

    const selectClasses = [
        styles.select,
        styles[size],
        error && styles.error,
        disabled && styles.disabled,
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

            <div className={styles.selectWrapper}>
                <select
                    ref={ref}
                    className={selectClasses}
                    disabled={disabled}
                    {...rest}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className={styles.arrow}>▼</span>
            </div>

            {error && <span className={styles.errorText}>{error}</span>}
            {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;




