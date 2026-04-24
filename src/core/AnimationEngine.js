/**
 * Akademi Suit - Animation Engine
 * GSAP Centralized Animation Controller
 */

import { gsap } from 'gsap';

class AnimationEngine {
  constructor() {
    this.ctx = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initializes the preloader entrance/loading animation
   */
  initPreloader() {
    this.ctx = gsap.context(() => {
      // Loading bar animation
      gsap.to('.preloader__bar', {
        x: '0%',
        duration: 2.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });

      // Logo floating effect
      gsap.to('.preloader__logo', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  }

  /**
   * Triggers the preloader exit animation
   * @returns {Promise} Resolves when animation is complete
   */
  exitPreloader() {
    return new Promise((resolve) => {
      if (!this.ctx) {
        resolve();
        return;
      }

      this.ctx.add(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.getElementById('preloader')?.remove();
            this.ctx.revert(); // Cleanup
            resolve();
          }
        });

        if (this.isReducedMotion) {
          tl.to('.preloader', { opacity: 0, duration: 0.5 });
        } else {
          tl.to('.preloader__bar', { scaleX: 1.5, opacity: 0, duration: 0.4, ease: 'power2.in' })
            .to('.preloader__content', { 
              y: -50, 
              opacity: 0, 
              scale: 0.9, 
              duration: 0.6, 
              ease: 'power4.in' 
            }, '-=0.2')
            .to('.preloader', { 
              opacity: 0, 
              scale: 0.95, 
              duration: 0.8, 
              ease: 'power4.inOut' 
            }, '-=0.3');
        }
      });
    });
  }
  /**
   * Animates the intro of the split hero panels
   */
  introSplitHero() {
    return new Promise((resolve) => {
      // If elements don't exist, resolve immediately
      if (!document.querySelector('.split-hero')) {
        resolve();
        return;
      }

      this.ctx.add(() => {
        const tl = gsap.timeline({ onComplete: () => resolve() });
        
        if (this.isReducedMotion) {
          gsap.set('.split-hero__content', { opacity: 1, y: 0 });
          return tl.to('.split-hero', { opacity: 1, duration: 0.5 });
        }

        // Set initial states for animation
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          gsap.set('.split-hero__panel--girls', { yPercent: -100 });
          gsap.set('.split-hero__panel--boys', { yPercent: 100 });
        } else {
          gsap.set('.split-hero__panel--girls', { xPercent: -100 });
          gsap.set('.split-hero__panel--boys', { xPercent: 100 });
        }
        gsap.set('.split-hero__content', { opacity: 0, y: 30 });

        // Intro animation
        tl.to(['.split-hero__panel--girls', '.split-hero__panel--boys'], {
          xPercent: 0,
          yPercent: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1
        })
        .to('.split-hero__content', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15
        }, '-=0.6');
      });
    });
  }

  /**
   * Cleans up GSAP context
   */
  destroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}

export const animationEngine = new AnimationEngine();
