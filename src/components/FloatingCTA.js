/**
 * FloatingCTA.js
 * Hemen Başvur butonu etkileşimleri ve GSAP giriş animasyonu.
 * Tema değişikliğine göre başvuru linkini günceller.
 */

import gsap from 'gsap';

const CTA_LINKS = {
  girls: 'https://s1.livinsoft.com/student/pre-registration/form/konukevi-b-blok-basvuru/23c5871d-e762-4d0a-a78b-53ed18635a56',
  boys: 'https://s1.livinsoft.com/student/pre-registration/form/konukevi-a-blok-basvuru/9f4f9731-ec8a-461c-8d89-61a4886aba20'
};

class FloatingCTA {
  constructor() {
    this.ctaContainer = null;
    this.ctaButton = null;
    this.headerCta = null;
    this.ctx = null;
    this.themeListener = null;
  }

  init() {
    this.ctaContainer = document.getElementById('floating-cta');
    this.ctaButton = document.getElementById('cta-call-button');
    this.headerCta = document.querySelector('.btn-cta--header');

    if (!this.ctaContainer || !this.ctaButton) return;

    // İlk tema durumuna göre linkleri güncelle
    const currentTheme = document.body.dataset.theme || 'girls';
    this.updateCtaLinks(currentTheme);

    this.ctx = gsap.context(() => {
      this.createIntroAnimation();
    }, this.ctaContainer);

    this.bindEvents();
    this.listenThemeChanges();
    this.observeSplitHero();
  }

  /**
   * Split hero bölümü görünürken floating CTA'yı gizler
   */
  observeSplitHero() {
    const splitHero = document.querySelector('.split-hero');
    if (!splitHero) return;

    this.splitHeroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        gsap.killTweensOf(this.ctaContainer);
        if (entry.isIntersecting) {
          gsap.set(this.ctaContainer, { opacity: 0, scale: 0.5, visibility: 'hidden', pointerEvents: 'none' });
        } else {
          gsap.to(this.ctaContainer, { opacity: 1, scale: 1, visibility: 'visible', duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' });
        }
      });
    }, { threshold: 0.1 });

    this.splitHeroObserver.observe(splitHero);
  }

  /**
   * Aktif temaya göre tüm CTA butonlarının href'ini günceller
   */
  updateCtaLinks(theme) {
    const href = CTA_LINKS[theme] || CTA_LINKS.girls;
    if (this.ctaButton) this.ctaButton.href = href;
    if (this.headerCta) this.headerCta.href = href;
  }

  listenThemeChanges() {
    this.themeListener = (e) => {
      const theme = e.detail.theme || 'girls';
      this.updateCtaLinks(theme);
    };
    window.addEventListener('themeChanged', this.themeListener);
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
    if (this.themeListener) {
      window.removeEventListener('themeChanged', this.themeListener);
    }
    if (this.splitHeroObserver) {
      this.splitHeroObserver.disconnect();
    }
  }
}

export const floatingCTA = new FloatingCTA();
