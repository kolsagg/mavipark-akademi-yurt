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
    
    this.panels.forEach((panel) => {
      const bg = panel.querySelector('.split-hero__bg');
      const overlay = panel.querySelector('.split-hero__overlay');
      const content = panel.querySelector('.split-hero__content');
      
      // Click event for navigation
      panel.addEventListener('click', (e) => {
        const theme = panel.dataset.panel;
        this.selectTheme(theme);
      });
      
      if (!this.mediaQuery.matches && isHoverable) {
        // Desktop Hover Events
        panel.addEventListener('mouseenter', () => {
          // Shrink all panels slightly first
          gsap.to(this.panels, {
            flex: 0.8,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          // Expand hovered panel
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
              backgroundColor: "rgba(26, 26, 26, 0.2)",
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
        });
        
        panel.addEventListener('mouseleave', () => {
          // Reset all panels
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
              backgroundColor: "rgba(26, 26, 26, 0.5)",
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
        });
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
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}

export function initSplitHero() {
  return new SplitHero();
}
