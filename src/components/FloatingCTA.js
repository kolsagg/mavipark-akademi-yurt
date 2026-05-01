/**
 * FloatingCTA.js
 * Hemen Başvur butonu etkileşimleri ve GSAP giriş animasyonu.
 */

import gsap from 'gsap';

class FloatingCTA {
  constructor() {
    this.ctaContainer = null;
    this.ctaButton = null;
    this.ctx = null;
  }

  init() {
    this.ctaContainer = document.getElementById('floating-cta');
    this.ctaButton = document.getElementById('cta-call-button');

    if (!this.ctaContainer || !this.ctaButton) return;

    this.ctx = gsap.context(() => {
      this.createIntroAnimation();
    }, this.ctaContainer);

    this.bindEvents();
  }

  bindEvents() {
    this.ctaButton.addEventListener('mouseenter', () => {
      this.playHoverAnimation();
    });

    this.ctaButton.addEventListener('mouseleave', () => {
      this.playHoverExitAnimation();
    });
  }

  playHoverAnimation() {
    gsap.to(this.ctaButton, {
      y: -5,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 15px 30px rgba(0,0,0,0.25)'
    });
  }

  playHoverExitAnimation() {
    gsap.to(this.ctaButton, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
      boxShadow: 'var(--shadow-lg)'
    });
  }

  createIntroAnimation() {
    gsap.fromTo(this.ctaContainer, 
      { 
        y: 100, 
        opacity: 0, 
        scale: 0.5,
        visibility: 'visible' 
      }, 
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        ease: 'elastic.out(1, 0.75)',
        delay: 2 // Preloader ve hero animasyonlarından sonra
      }
    );
  }

  destroy() {
    if (this.ctx) this.ctx.revert();
  }
}

export const floatingCTA = new FloatingCTA();
