import React, { useEffect } from 'react';
import '../styles/Landing.css';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import TZBanner from '../components/landing/TZBanner';
import Portfolio from '../components/landing/Portfolio';
import Stats from '../components/landing/Stats';
import Process from '../components/landing/Process';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

function useRevealOnScroll() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .stat-card, .process-step');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

export default function Landing() {
  useRevealOnScroll();

  return (
    <div className="landing">
      <Header />
      <Hero />
      <Services />
      <TZBanner />
      <Portfolio />
      <Stats />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}


