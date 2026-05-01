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
    this.menu = document.querySelector('.js-header-menu');
    this.navLinks = document.querySelectorAll('.nav__link');

    // Create GSAP context for easy cleanup
    this.ctx = gsap.context(() => {
      this.initEvents();
      this.initScroll();
      this.initScrollObserver();
      this.initResize();
      this.initHovers();
      this.initSmoothScroll();
      
      // Initial sync
      const currentTheme = document.body.dataset.theme;
      if (currentTheme) {
        this.updatePill(currentTheme, false);
      } else {
        if (this.pill) gsap.set(this.pill, { opacity: 0 });
      }

      this.updateActiveLinks();
    });


    this.isInitialized = true;
  }

  /**
   * Initializes smooth scroll for all anchor links (header + hero CTA)
   */
  static initSmoothScroll() {
    // Handle all anchor links on the page
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (this.menu && this.menu.classList.contains('header__menu--visible')) {
            this.menu.classList.remove('header__menu--visible');
            if (this.menuToggle) this.menuToggle.setAttribute('aria-expanded', 'false');
          }

          // Account for fixed header height
          const headerHeight = this.header ? this.header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Initializes event listeners
   */
  static initEvents() {
    if (this.menuToggle && this.menu) {
      this.menuToggle.addEventListener('click', () => {
        const isVisible = this.menu.classList.toggle('header__menu--visible');
        this.menuToggle.setAttribute('aria-expanded', isVisible);
        
        // Re-sync pill when menu opens (layout might have changed)
        if (isVisible) {
          const currentTheme = document.body.dataset.theme;
          if (currentTheme) this.updatePill(currentTheme, false);
        }
      });

      // Close menu when link is clicked (mobile)
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.menu.classList.remove('header__menu--visible');
          this.menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTheme = btn.dataset.themeTarget;
        ThemeManager.setTheme(targetTheme);
      });
    });

    // Listen for theme changes
    this._onThemeChanged = (e) => {
      const theme = e.detail?.theme;
      if (theme) this.updatePill(theme);
    };

    window.addEventListener('themeChanged', this._onThemeChanged);
    
    // Listen for hash changes for active link state
    this._onHashChange = () => this.updateActiveLinks();
    window.addEventListener('hashchange', this._onHashChange);

  }

  /**
   * Initializes GSAP hover animations for links
   */
  static initHovers() {
    this.navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { 
          y: -2, 
          color: 'var(--theme-primary)', 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });

      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('nav__link--active')) {
          gsap.to(link, { 
            y: 0, 
            color: 'var(--theme-text)', 
            duration: 0.3, 
            ease: 'power2.inOut' 
          });
        } else {
          gsap.to(link, { 
            y: 0, 
            duration: 0.3, 
            ease: 'power2.inOut' 
          });
        }
      });
    });

    // Logo hover
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        gsap.to('.logo__sub', { x: 5, duration: 0.4, ease: 'back.out(2)' });
      });
      logo.addEventListener('mouseleave', () => {
        gsap.to('.logo__sub', { x: 0, duration: 0.4, ease: 'power2.inOut' });
      });
    }
  }

  /**
   * Updates active state of navigation links based on hash or scroll position
   */
  static updateActiveLinks() {
    const currentHash = window.location.hash || '#';
    const currentPath = window.location.pathname;

    // First, try matching by hash or path
    let matchedLink = null;
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === currentHash || (href === '/' && (currentPath === '/' || currentPath === '/index.html') && currentHash === '#');
      
      if (isActive) matchedLink = link;
    });

    // If no hash match, check scroll position (IntersectionObserver handles this now)
    this.navLinks.forEach(link => {
      const isActive = link === matchedLink;
      
      if (isActive) {
        link.classList.add('nav__link--active');
        gsap.to(link, { color: 'var(--theme-primary)', duration: 0.3 });
      } else {
        link.classList.remove('nav__link--active');
        gsap.to(link, { color: 'var(--theme-text)', duration: 0.3 });
      }
    });
  }

  /**
   * Initializes IntersectionObserver for scroll-based active links
   */
  static initScrollObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            // Update UI without changing hash (less intrusive)
            this.navLinks.forEach(link => {
              const href = link.getAttribute('href');
              const isActive = href === `#${id}`;
              
              if (isActive) {
                link.classList.add('nav__link--active');
                gsap.to(link, { color: 'var(--theme-primary)', duration: 0.3 });
              } else {
                link.classList.remove('nav__link--active');
                gsap.to(link, { color: 'var(--theme-text)', duration: 0.3 });
              }
            });
          }
        }
      });
    }, options);

    // Observe all sections that have a corresponding nav link
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) observer.observe(target);
      }
    });

    this._observer = observer;
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

    const performAnimation = () => {
      gsap.to(this.pill, {
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1,
        duration: animate ? 0.5 : 0,
        ease: animate ? 'elastic.out(1, 0.8)' : 'power2.out'
      });
    };

    if (this.ctx) {
      this.ctx.add(performAnimation);
    } else {
      performAnimation();
    }

  }

  /**
   * Cleans up listeners and context
   */
  static cleanup() {
    if (this.ctx) this.ctx.revert();
    if (this._observer) this._observer.disconnect();
    window.removeEventListener('themeChanged', this._onThemeChanged);
    window.removeEventListener('hashchange', this._onHashChange);
    window.removeEventListener('scroll', this._handleScroll);
    window.removeEventListener('resize', this._handleResize);

    this.isInitialized = false;
  }
}

export default Navigation;
