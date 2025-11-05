import Link from 'next/link';

export default function NotFound() {
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
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ marginBottom: '1rem' }}>Страница не найдена</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                К сожалению, запрошенная страница не существует
            </p>
            <Link
                href="/"
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none'
                }}
            >
                Вернуться на главную
            </Link>
        </div>
    );
}




