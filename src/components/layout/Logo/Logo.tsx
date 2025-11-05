'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: 'small' | 'default' | 'large';
}

export default function Logo({ className = '', showText = true, size = 'default' }: LogoProps) {
    const sizes = {
        small: { width: 20, height: 20 },
        default: { width: 24, height: 24 },
        large: { width: 32, height: 32 },
    };

    const { width, height } = sizes[size];

    return (
        <div className={`logo flex items-center gap-3 ${className}`}>
            <Image src="/icon.svg" alt="Дизайн360" width={width} height={height} className="drop-shadow-lg" priority />
            {showText && <span className="font-bold text-xl text-gray-800">ДИЗАЙН360</span>}
        </div>
    );
}
