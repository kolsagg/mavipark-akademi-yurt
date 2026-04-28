import gsap from 'gsap';
import ThemeManager from '../core/ThemeManager.js';

/**
 * Navigation Component
 * Handles the theme switcher and header interactions.
 */
class Navigation {
  static init() {
    // Prevent double initialization
    if (this.isInitialized) return;
    
    this.buttons = document.querySelectorAll('.js-nav-btn');
    this.pill = document.querySelector('.js-nav-pill');
    this.header = document.querySelector('.header');
    this.menuToggle = document.querySelector('.js-menu-toggle');
    this.nav = document.querySelector('.nav');

    // Create GSAP context for easy cleanup
    this.ctx = gsap.context(() => {
      this.initEvents();
      this.initScroll();
      this.initResize();
      
      // Initial sync with current theme
      const currentTheme = document.body.dataset.theme;
      if (currentTheme) {
        this.updatePill(currentTheme, false);
      } else {
        if (this.pill) gsap.set(this.pill, { opacity: 0 });
      }
    });

    this.isInitialized = true;
  }

  /**
   * Initializes event listeners
   */
  static initEvents() {
    if (this.menuToggle && this.nav) {
      this.menuToggle.addEventListener('click', () => {
        const isVisible = this.nav.classList.toggle('nav--visible');
        this.menuToggle.setAttribute('aria-expanded', isVisible);
        
        // Re-sync pill when menu opens (layout might have changed)
        if (isVisible) {
          const currentTheme = document.body.dataset.theme;
          if (currentTheme) this.updatePill(currentTheme, false);
        }
      });
    }

    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTheme = btn.dataset.themeTarget;
        ThemeManager.setTheme(targetTheme);
      });
    });

    // Listen for theme changes
    const onThemeChanged = (e) => {
      const { theme } = e.detail;
      this.updatePill(theme);
    };

    window.addEventListener('themeChanged', onThemeChanged);
    
    // Store for cleanup if needed
    this._onThemeChanged = onThemeChanged;
  }

  /**
   * Handles header appearance on scroll
   */
  static initScroll() {
    if (!this.header) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        this.header.classList.add('header--scrolled');
      } else {
        this.header.classList.remove('header--scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    this._handleScroll = handleScroll;
  }

  /**
   * Handles pill repositioning on window resize
   */
  static initResize() {
    const handleResize = () => {
      const currentTheme = document.body.dataset.theme;
      if (currentTheme) {
        this.updatePill(currentTheme, false);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    this._handleResize = handleResize;
  }

  /**
   * Updates the switcher pill position and active state
   * @param {string|null} theme - 'girls' or 'boys' or null
   * @param {boolean} animate - whether to animate the transition
   */
  static updatePill(theme, animate = true) {
    if (!this.pill || !this.buttons.length) return;

    const targetBtn = Array.from(this.buttons).find(btn => btn.dataset.themeTarget === theme);
    
    this.buttons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));

    if (!targetBtn || !theme) {
      gsap.to(this.pill, { 
        opacity: 0, 
        duration: animate ? 0.3 : 0,
        ease: 'power2.inOut'
      });
      return;
    }

    targetBtn.setAttribute('aria-pressed', 'true');
    
    const { offsetLeft, offsetWidth } = targetBtn;

    gsap.to(this.pill, {
      left: offsetLeft,
      width: offsetWidth,
      opacity: 1,
      duration: animate ? 0.5 : 0,
      ease: animate ? 'elastic.out(1, 0.8)' : 'power2.out'
    });
  }

  /**
   * Cleans up listeners and context
   */
  static cleanup() {
    if (this.ctx) this.ctx.revert();
    window.removeEventListener('themeChanged', this._onThemeChanged);
    window.removeEventListener('scroll', this._handleScroll);
    window.removeEventListener('resize', this._handleResize);
    this.isInitialized = false;
  }
}

export default Navigation;
