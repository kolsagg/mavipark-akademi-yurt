import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Akademi Suit - Scroll Engine
 * Manages scroll-triggered animations and reveal effects with batching support
 */
class ScrollEngine {
  constructor() {
    this.ctx = null;
    this.mm = gsap.matchMedia();
  }

  /**
   * Initializes scroll triggers and reveals
   */
  init() {
    // If context already exists, revert it first
    if (this.ctx) {
      this.ctx.revert();
    }

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
        duration: 1.2, 
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          onEnter: () => el.classList.add('is-animating'),
          onEnterBack: () => el.classList.add('is-animating')
        }
      };

      if (type === 'up') initialVars.y = 40;
      if (type === 'down') initialVars.y = -40;
      if (type === 'left') initialVars.x = 40;
      if (type === 'right') initialVars.x = -40;

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
      gsap.set(items, { opacity: 0, y: 30 });

      ScrollTrigger.batch(items, {
        onEnter: batch => {
          batch.forEach(el => el.classList.add('is-animating'));
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: { each: 0.15, grid: 'auto' },
            overwrite: true,
            duration: 1,
            ease: 'power2.out',
            onStart: () => gsap.set(batch, { visibility: 'visible' }),
            onComplete: () => batch.forEach(el => el.classList.remove('is-animating'))
          });
        },
        start: 'top 85%'
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
      console.log('ScrollEngine: Refreshed triggers for new content');
    }, 150); // Slightly increased debounce for safety
  }

  /**
   * Cleans up GSAP context and matchMedia
   */
  destroy() {
    if (this.refreshTimeout) clearTimeout(this.refreshTimeout);
    if (this.mm) this.mm.revert();
    if (this.ctx) this.ctx.revert();
  }
}

export const scrollEngine = new ScrollEngine();
