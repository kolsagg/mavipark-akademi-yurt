import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollEngine Configuration Constants
 */
const SCROLL_CONFIG = {
  TRIGGER_START: 'top 85%',
  REVEAL_DURATION: 1.2,
  BATCH_DURATION: 1,
  BATCH_STAGGER: 0.15,
  REFRESH_DEBOUNCE: 150,
  INITIAL_OFFSET: 40,
  BATCH_OFFSET: 30,
  EASE_MAIN: 'power3.out',
  EASE_BATCH: 'power2.out'
};

/**
 * Akademi Suit - Scroll Engine
 * Manages scroll-triggered animations and reveal effects with batching support
 */
class ScrollEngine {
  constructor() {
    this.ctx = null;
    this.mm = gsap.matchMedia();
    this.refreshTimeout = null;
  }

  /**
   * Initializes scroll triggers and reveals
   */
  init() {
    // If context already exists, revert it first
    this.destroy();

    this.ctx = gsap.context(() => {
      // Use matchMedia to handle accessibility preferences dynamically
      this.mm.add("(prefers-reduced-motion: reduce)", () => {
        // Reduced motion: immediate state
        this.revealImmediately();
      });

      this.mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Normal motion: setup animations
        this.initReveals();
        this.initBatches();
      });
    });

    // Note: ScrollTrigger.refresh() is now called by components themselves 
    // after their content rendering is complete, to avoid race conditions.
  }

  /**
   * Shows all reveal elements immediately (for reduced motion)
   */
  revealImmediately() {
    const allReveals = document.querySelectorAll('[data-reveal], [data-reveal-batch]');
    gsap.set(allReveals, { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      visibility: 'visible',
      clearProps: 'all' 
    });
  }

  /**
   * Sets up individual reveal animations for [data-reveal] elements
   */
  initReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]:not([data-reveal-batch]):not([data-scroll-init])');

    if (revealElements.length === 0) return;

    revealElements.forEach((el) => {
      el.setAttribute('data-scroll-init', 'true');
      const type = el.dataset.reveal || 'up';
      const delay = parseFloat(el.dataset.revealDelay) || 0;
      
      let initialVars = { opacity: 0, visibility: 'visible' };
      let animVars = { 
        opacity: 1, 
        duration: SCROLL_CONFIG.REVEAL_DURATION, 
        ease: SCROLL_CONFIG.EASE_MAIN,
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: SCROLL_CONFIG.TRIGGER_START,
          toggleActions: 'play none none none',
          once: true,
          onEnter: () => el.classList.add('is-animating'),
          onEnterBack: () => el.classList.add('is-animating')
        }
      };

      if (type === 'up') initialVars.y = SCROLL_CONFIG.INITIAL_OFFSET;
      if (type === 'down') initialVars.y = -SCROLL_CONFIG.INITIAL_OFFSET;
      if (type === 'left') initialVars.x = SCROLL_CONFIG.INITIAL_OFFSET;
      if (type === 'right') initialVars.x = -SCROLL_CONFIG.INITIAL_OFFSET;

      gsap.set(el, initialVars);
      gsap.to(el, animVars);
    });
  }

  /**
   * Sets up batched reveal animations for [data-reveal-batch] elements
   */
  initBatches() {
    const batchContainers = document.querySelectorAll('[data-reveal-container]');
    
    batchContainers.forEach(container => {
      const items = container.querySelectorAll('[data-reveal-batch]:not([data-scroll-init])');
      if (items.length === 0) return;

      // Mark items as initialized
      items.forEach(el => el.setAttribute('data-scroll-init', 'true'));

      // Set initial states before creating the batch to avoid race conditions
      gsap.set(items, { opacity: 0, y: SCROLL_CONFIG.BATCH_OFFSET, visibility: 'visible' });

      ScrollTrigger.batch(items, {
        onEnter: batch => {
          batch.forEach(el => el.classList.add('is-animating'));
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: { each: SCROLL_CONFIG.BATCH_STAGGER, grid: 'auto' },
            overwrite: true,
            duration: SCROLL_CONFIG.BATCH_DURATION,
            ease: SCROLL_CONFIG.EASE_BATCH,
            onStart: () => gsap.set(batch, { visibility: 'visible' }),
            onComplete: () => batch.forEach(el => el.classList.remove('is-animating'))
          });
        },
        start: SCROLL_CONFIG.TRIGGER_START
      });
    });
  }

  /**
   * Manually trigger a re-scan of the DOM for new reveal elements
   * Useful for dynamically injected content. Debounced to prevent performance spikes.
   */
  refresh() {
    if (this.refreshTimeout) clearTimeout(this.refreshTimeout);
    
    this.refreshTimeout = setTimeout(() => {
      if (this.ctx) {
        this.ctx.add(() => {
          // Re-scan for NEW elements only
          if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.initReveals();
            this.initBatches();
          } else {
            this.revealImmediately();
          }
        });
      }
      ScrollTrigger.refresh();
      console.log('ScrollEngine: Refreshed triggers');
    }, SCROLL_CONFIG.REFRESH_DEBOUNCE);
  }

  /**
   * Cleans up GSAP context and matchMedia
   */
  destroy() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
    if (this.ctx) {
      this.ctx.revert();
      this.ctx = null;
    }
    // Note: this.mm.revert() is handled by this.ctx.revert() if they are linked
    // but better to be explicit or just ensure ctx is clean.
  }
}

export const scrollEngine = new ScrollEngine();
