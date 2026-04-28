import { gsap } from 'gsap';

/**
 * GlassCard Component Logic
 * Handles high-performance GSAP interactions for glass cards
 */
const GlassCard = {
  /**
   * Initialize hover animations for all cards
   */
  init() {
    const cards = document.querySelectorAll('[data-glass-card]');
    
    if (cards.length === 0) return;

    cards.forEach(card => {
      // Guard: Don't initialize twice
      if (card._gsapCtx) return;
      this.bindEvents(card);
    });

    console.info(`[GlassCard] Initialized ${cards.length} cards`);
  },

  /**
   * Animation Configuration
   */
  config: {
    y: -10,
    scale: 1.02,
    duration: 0.4,
    ease: 'power2.out',
    shadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
  },

  /**
   * Bind GSAP animations to card events
   * @param {HTMLElement} card 
   */
  bindEvents(card) {
    // Create a local GSAP context for the card
    const ctx = gsap.context(() => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(card, {
        y: this.config.y,
        scale: this.config.scale,
        boxShadow: this.config.shadow,
        duration: this.config.duration,
        ease: this.config.ease
      });

      card.addEventListener('mouseenter', () => {
        hoverTl.play();
      });

      card.addEventListener('mouseleave', () => {
        hoverTl.reverse();
      });
    }, card);

    // Store context for cleanup if needed
    card._gsapCtx = ctx;
  },

  /**
   * Cleanup method to prevent memory leaks
   */
  destroy() {
    const cards = document.querySelectorAll('[data-glass-card]');
    cards.forEach(card => {
      if (card._gsapCtx) {
        card._gsapCtx.revert();
        delete card._gsapCtx;
      }
    });
  }
};

export default GlassCard;
