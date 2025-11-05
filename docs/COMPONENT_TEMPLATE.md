# 🧩 Шаблон компонента

## Структура компонента

Каждый компонент должен находиться в своей папке и содержать следующие файлы:

```
ComponentName/
├── ComponentName.tsx          # Основной код компонента
├── ComponentName.module.css   # Стили (CSS Modules)
├── ComponentName.types.ts     # TypeScript типы (опционально, если сложные)
├── index.ts                   # Экспорт
└── README.md                  # Документация (опционально)
```

---

## 📝 Шаблон основного файла

### `ComponentName.tsx`

```typescript
import React from 'react';
import styles from './ComponentName.module.css';
import { ComponentNameProps } from './ComponentName.types';
// или если типы простые:
// import { ComponentNameProps } from '@/types/common';

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Props деструктуризация
  title,
  description,
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  // State (если нужен)
  // const [state, setState] = React.useState();

  // Handlers
  // const handleClick = () => { ... };

  // Computed values
  const classes = [
    styles.component,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
};

// Можно экспортировать напрямую
export default ComponentName;
```

---

## 🎨 Шаблон стилей

### `ComponentName.module.css`

```css
.component {
  /* Layout */
  display: flex;
  flex-direction: column;

  /* Spacing */
  padding: var(--spacing-md);
  gap: var(--spacing-sm);

  /* Typography */
  font-family: var(--font-family-base);

  /* Colors */
  background-color: var(--color-white);
  color: var(--color-gray-900);

  /* Border */
  border-radius: var(--radius-md);

  /* Shadow */
  box-shadow: var(--shadow-sm);

  /* Transition */
  transition: var(--transition-base);
}

/* Variants */
.component.primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.component.secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
}

/* Sizes */
.component.sm {
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.component.lg {
  padding: var(--spacing-lg);
  font-size: var(--font-size-lg);
}

/* Child elements */
.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.description {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  margin: 0;
}

/* States */
.component:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.component:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .component {
    padding: var(--spacing-sm);
  }

  .title {
    font-size: var(--font-size-lg);
  }
}
```

---

## 📦 Шаблон типов

### `ComponentName.types.ts`

```typescript
import { ReactNode } from "react";

export interface ComponentNameProps {
  // Required props
  title: string;

  // Optional props with defaults
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";

  // Optional props
  description?: string;
  className?: string;
  children?: ReactNode;

  // Event handlers
  onClick?: () => void;
  onChange?: (value: string) => void;

  // Advanced
  [key: string]: any; // Для остальных пропсов
}
```

---

## 🚀 Экспорт

### `index.ts`

```typescript
export { ComponentName, default } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName.types";
```

---

## 📚 Примеры компонентов

### 1. Button Component

#### `Button/Button.tsx`

```typescript
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  className = '',
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className={styles.spinner} />}
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
```

#### `Button/Button.module.css`

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button:active:not(:disabled) {
  transform: translateY(0);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
}

.accent {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.outline {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.ghost {
  background-color: transparent;
  color: var(--color-primary);
}

.ghost:hover:not(:disabled) {
  background-color: var(--color-gray-100);
}

/* Sizes */
.sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

/* Loading */
.loading {
  pointer-events: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Icon */
.icon {
  display: flex;
  align-items: center;
}
```

---

### 2. Card Component

#### `Card/Card.tsx`

```typescript
import React from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  badge,
  footer,
  onClick,
  className = '',
  children,
}) => {
  const classes = [
    styles.card,
    onClick && styles.clickable,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className={styles.image}
          />
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
```

---

## ✅ Чек-лист создания компонента

- [ ] Создана папка с именем компонента
- [ ] Создан основной файл `.tsx`
- [ ] Созданы стили `.module.css`
- [ ] Определены TypeScript типы
- [ ] Создан файл `index.ts` для экспорта
- [ ] Компонент использует design tokens из `variables.css`
- [ ] Компонент адаптивный (responsive)
- [ ] Обработаны состояния (hover, active, disabled)
- [ ] Добавлена документация (если нужно)
- [ ] Проверена доступность (accessibility)

---

## 🎯 Best Practices

1. **Naming**: PascalCase для компонентов, camelCase для файлов стилей
2. **Props**: Используйте TypeScript для типизации
3. **Styles**: Используйте CSS Modules для изоляции стилей
4. **Variables**: Используйте CSS переменные из `variables.css`
5. **Responsive**: Делайте компоненты адаптивными
6. **Accessibility**: Добавляйте ARIA атрибуты где нужно
7. **Performance**: Используйте React.memo для тяжелых компонентов
8. **Composition**: Предпочитайте композицию наследованию

---

## 📖 Использование компонента

```typescript
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function MyPage() {
  return (
    <div>
      <Card
        title="Заголовок"
        description="Описание"
        image="/images/example.jpg"
        imageAlt="Пример"
        badge="Новинка"
        footer={
          <Button
            text="Подробнее"
            variant="primary"
            onClick={() => console.log('clicked')}
          />
        }
      />
    </div>
  );
}
```

---

## 🔄 Обновление компонента

Когда нужно обновить компонент:

1. Проверьте типы - нужны ли новые props
2. Обновите стили если нужно
3. Обновите документацию
4. Проверьте все использования компонента
5. Тестируйте на разных экранах

---

## 📞 Вопросы?

Если непонятно как создать компонент - спрашивайте!



