/**
 * Akademi Suit - Animation Engine
 * GSAP Centralized Animation Controller
 */

import { gsap } from 'gsap';

class AnimationEngine {
  constructor() {
    this.mm = gsap.matchMedia();
  }

  /**
   * Initializes the preloader entrance/loading animation
   */
  initPreloader() {
    this.mm.add("(prefers-reduced-motion: no-preference)", () => {
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

    this.mm.add("(prefers-reduced-motion: reduce)", () => {
      // Simplified or no animation for reduced motion
      gsap.set('.preloader__bar', { x: '0%', opacity: 0.5 });
    });
  }

  /**
   * Triggers the preloader exit animation
   * @returns {Promise} Resolves when animation is complete
   */
  exitPreloader() {
    return new Promise((resolve) => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const preloader = document.getElementById('preloader');

      if (!preloader) {
        resolve();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          preloader.remove();
          resolve();
        }
      });

      if (isReduced) {
        tl.to(preloader, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      } else {
        tl.to('.preloader__bar', { scaleX: 1.5, opacity: 0, duration: 0.4, ease: 'power2.in' })
          .to('.preloader__content', { 
            y: -50, 
            opacity: 0, 
            scale: 0.9, 
            duration: 0.5, 
            ease: 'power4.in' 
          }, '-=0.2')
          .to(preloader, { 
            opacity: 0, 
            duration: 0.6, 
            ease: 'power3.inOut' 
          }, '-=0.3');
      }

      // Safety timeout: ensure site becomes interactive even if GSAP stalls
      setTimeout(() => {
        if (document.getElementById('preloader')) {
          console.warn('[AkademiSuit] Preloader exit stalled, forcing removal.');
          preloader.remove();
          resolve();
        }
      }, 2000);
    });
  }

  /**
   * Animates the intro of the split hero panels
   */
  introSplitHero() {
    return new Promise((resolve) => {
      if (!document.querySelector('.split-hero')) {
        resolve();
        return;
      }

      this.mm.add({
        isReduced: "(prefers-reduced-motion: reduce)",
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)"
      }, (context) => {
        let { isReduced, isMobile } = context.conditions;
        let isResolved = false;
        
        const tl = gsap.timeline({ 
          onComplete: () => {
            if (!isResolved) {
              isResolved = true;
              resolve();
            }
          } 
        });

        if (isReduced) {
          gsap.set('.split-hero__content', { opacity: 1, y: 0 });
          tl.to('.split-hero', { opacity: 1, duration: 0.5 });
          return;
        }

        // Set initial states for animation
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
   * Animates the intro of regular page content (Rooms, Amenities)
   */
  introPageContent() {
    return new Promise((resolve) => {
      const contentElements = document.querySelectorAll('.room-panel, .amenities-panel');
      if (contentElements.length === 0) {
        resolve();
        return;
      }

      let isResolved = false;

      this.mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(contentElements, { opacity: 1, y: 0 });
        if (!isResolved) {
          isResolved = true;
          resolve();
        }
      });

      this.mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(contentElements, { opacity: 0, y: 50 });

        gsap.to(contentElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          onComplete: () => {
            if (!isResolved) {
              isResolved = true;
              resolve();
            }
          }
        });
      });
    });
  }

  /**
   * Cleans up GSAP context
   */
  destroy() {
    if (this.mm) {
      this.mm.revert();
    }
  }
}

export const animationEngine = new AnimationEngine();
