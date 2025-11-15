'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { settingsService } from '@/lib/firebase/services';

export const Footer: React.FC = () => {
    const [settings, setSettings] = useState<{
        site: {
            title: string;
            description: string;
            phone: string;
            email: string;
            address: string;
        };
        settings: {
            contact: {
                workingHours: string;
                socialMedia: {
                    instagram: string;
                    telegram: string;
                    whatsapp: string;
                };
            };
        };
    } | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await settingsService.get();
            if (data) {
                setSettings(data);
            }
        } catch (error) {
            console.error('Ошибка загрузки настроек:', error);
        }
    };

    const siteTitle = settings?.site?.title || 'Дизайн360';
    const siteDescription = settings?.site?.description || 'Профессиональные услуги для создания комфортных и функциональных пространств';
    const phone = settings?.site?.phone || '+7 (911) 493-46-41';
    const email = settings?.site?.email || '89114934641@bk.ru';
    const address = settings?.site?.address || 'Калининград, Медовый мост';
    const workingHours = settings?.settings?.contact?.workingHours || 'Пн-Пт: 9:00-18:00';
    const socialMedia = settings?.settings?.contact?.socialMedia;

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>{siteTitle}</h3>
                    <p>{siteDescription}</p>
                </div>
                <div className="footer-column">
                    <h3>Услуги</h3>
                    <ul>
                        <li>
                            <Link href="/services">Дизайн интерьера</Link>
                        </li>
                        <li>
                            <Link href="/services">3D-визуализация</Link>
                        </li>
                        <li>
                            <Link href="/realtors">Для риелторов</Link>
                        </li>
                        <li>
                            <Link href="/services">Архитектурные решения</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Компания</h3>
                    <ul>
                        <li>
                            <Link href="/">О нас</Link>
                        </li>
                        <li>
                            <Link href="/">Кейсы</Link>
                        </li>
                        <li>
                            <Link href="/">Отзывы</Link>
                        </li>
                        <li>
                            <Link href="/">Блог</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Контакты</h3>
                    <ul>
                        <li>
                            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                        </li>
                        <li>
                            <a href={`mailto:${email}`}>{email}</a>
                        </li>
                        <li>{address}</li>
                        <li>{workingHours}</li>
                        {socialMedia && (
                            <>
                                {socialMedia.instagram && (
                                    <li>
                                        <a href={`https://instagram.com/${socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                                            Instagram: {socialMedia.instagram}
                                        </a>
                                    </li>
                                )}
                                {socialMedia.telegram && (
                                    <li>
                                        <a href={`https://t.me/${socialMedia.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                                            Telegram: {socialMedia.telegram}
                                        </a>
                                    </li>
                                )}
                                {socialMedia.whatsapp && (
                                    <li>
                                        <a href={`https://wa.me/${socialMedia.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer">
                                            WhatsApp: {socialMedia.whatsapp}
                                        </a>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} {siteTitle}. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
