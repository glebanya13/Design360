'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '24px',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Упс!</h1>
            <h2 style={{ marginBottom: '1rem' }}>Что-то пошло не так</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                Произошла ошибка при загрузке страницы
            </p>
            <button
                onClick={() => reset()}
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Попробовать снова
            </button>
        </div>
    );
}




