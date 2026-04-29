import gsap from 'gsap';
import ThemeManager from '../core/ThemeManager.js';

export class SplitHero {
  constructor() {
    this.container = document.querySelector('.split-hero');
    this.panels = document.querySelectorAll('.split-hero__panel');
    
    if (!this.container || this.panels.length === 0) return;
    
    // Check for reduced motion preference
    this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.ctx = null;
    
    this.init();
  }

  init() {
    // Set up GSAP Context for scoping and easy cleanup
    this.ctx = gsap.context(() => {
      this.initEvents();
    }, this.container);
  }
  
  initEvents() {
    // Only apply hover animations if reduced motion is not preferred
    // and it's a hover-capable device (desktop)
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    
    // Store handlers for cleanup
    this.handlers = [];

    this.panels.forEach((panel) => {
      const bg = panel.querySelector('.split-hero__bg');
      const overlay = panel.querySelector('.split-hero__overlay');
      const content = panel.querySelector('.split-hero__content');
      
      const clickHandler = () => {
        const theme = panel.dataset.panel;
        this.selectTheme(theme);
      };

      panel.addEventListener('click', clickHandler);
      this.handlers.push({ el: panel, type: 'click', fn: clickHandler });
      
      if (!this.mediaQuery.matches && isHoverable) {
        const enterHandler = () => {
          gsap.to(this.panels, {
            flex: 0.8,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          gsap.to(panel, {
            flex: 1.2,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          if (bg) {
            gsap.to(bg, {
              scale: 1.05,
              duration: 1.2,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
          
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.4, // Reduced from 1 (base in CSS should be 1 with background)
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
          
          if (content) {
            gsap.to(content, {
              y: -10,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        };

        const leaveHandler = () => {
          gsap.to(this.panels, {
            flex: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          if (bg) {
            gsap.to(bg, {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
          
          if (overlay) {
            gsap.to(overlay, {
              opacity: 1, // Reset to base CSS opacity
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
          
          if (content) {
            gsap.to(content, {
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        };

        panel.addEventListener('mouseenter', enterHandler);
        panel.addEventListener('mouseleave', leaveHandler);
        this.handlers.push({ el: panel, type: 'mouseenter', fn: enterHandler });
        this.handlers.push({ el: panel, type: 'mouseleave', fn: leaveHandler });
      }
    });
  }
  
  selectTheme(theme) {
    console.info(`[SplitHero] Navigating to: ${theme}`);
    
    // Visual feedback for click
    this.panels.forEach(p => p.classList.remove('is-active'));
    const activePanel = Array.from(this.panels).find(p => p.dataset.panel === theme);
    if (activePanel) activePanel.classList.add('is-active');

    // Redirect to the dedicated app page with theme param
    const targetPage = `/yurt.html?type=${theme === 'girls' ? 'girls' : 'boys'}`;
    
    // Brief delay for visual feedback if needed, or immediate redirect
    setTimeout(() => {
      window.location.href = targetPage;
    }, 400);
  }
  
  destroy() {
    // Remove all event listeners
    if (this.handlers) {
      this.handlers.forEach(({ el, type, fn }) => {
        el.removeEventListener(type, fn);
      });
      this.handlers = [];
    }

    if (this.ctx) {
      this.ctx.revert();
    }
  }
}

export function initSplitHero() {
  return new SplitHero();
}
