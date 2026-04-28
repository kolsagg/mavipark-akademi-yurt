/**
 * FloatingCTA.js
 * Hemen Başvur butonu etkileşimleri, kopyalama mantığı ve GSAP giriş animasyonu.
 */

import gsap from 'gsap';

class FloatingCTA {
  constructor() {
    this.ctaContainer = null;
    this.ctaButton = null;
    this.phoneNumber = '+905555555555'; // TODO: Gerçek numara ile değiştirin
    this.toastTimeout = null;
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
    this.ctaButton.addEventListener('click', (e) => {
      this.handleAction(e);
      this.playClickAnimation();
    });

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
      // Shadow uses a theme-relative value via CSS variable if possible, 
      // otherwise we use a more neutral dark shadow
      boxShadow: '0 15px 30px rgba(0,0,0,0.25)'
    });
    
    gsap.to('.floating-cta__icon', {
      rotate: 15,
      scale: 1.2,
      duration: 0.3,
      ease: 'back.out(2)'
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

    gsap.to('.floating-cta__icon', {
      rotate: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut'
    });
  }

  playClickAnimation() {
    gsap.to(this.ctaButton, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    });
  }

  handleAction(e) {
    // Width based detection is more consistent with our CSS breakpoints
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobilde doğrudan ara
      window.location.href = `tel:${this.phoneNumber}`;
    } else {
      // Masaüstünde panoya kopyala
      this.copyToClipboard(this.phoneNumber);
    }
  }

  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        this.showToast('Telefon numarası kopyalandı');
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed'; // Prevent scrolling to bottom
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          this.showToast('Telefon numarası kopyalandı');
        } catch (err) {
          console.error('Fallback kopyalama başarısız', err);
          this.showToast('Kopyalama başarısız oldu');
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  }

  showToast(message) {
    // Mevcut toast'ları temizle
    const existingContainer = document.querySelector('.toast-container');
    if (existingContainer) {
      existingContainer.remove();
    }

    const container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    container.appendChild(toast);
    document.body.appendChild(container);

    // Animasyon ile göster
    requestAnimationFrame(() => {
      toast.classList.add('toast--visible');
    });

    // 3 saniye sonra kaldır
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('toast--visible');
      setTimeout(() => {
        if (container.parentNode) container.remove();
      }, 300);
    }, 3000);
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
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }
}

export const floatingCTA = new FloatingCTA();
