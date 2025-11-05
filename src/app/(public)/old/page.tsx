'use client';

import React from 'react';
import Hero from '@/components/sections/Hero/Hero';
import Services from '@/components/sections/Services/Services';
import TZBanner from '@/components/sections/TZBanner/TZBanner';
import Portfolio from '@/components/sections/Portfolio/Portfolio';
import Stats from '@/components/sections/Stats/Stats';
import Process from '@/components/sections/Process/Process';
import CTA from '@/components/sections/CTA/CTA';
import '@/styles/ExactLanding.css';

export default function OldLanding() {
    return (
        <div className="landing">
            <Hero />
            <Services />
            <TZBanner />
            <Portfolio />
            <Stats />
            <Process />
            <CTA />
        </div>
    );
}


