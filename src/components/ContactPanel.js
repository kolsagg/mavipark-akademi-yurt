import { scrollEngine } from '../core/ScrollEngine.js';

/**
 * ContactPanel Component
 * Handles interactions and theme-aware updates for the contact section.
 */
class ContactPanel {
  constructor() {
    this.section = null;
    this.themeListener = null;
  }

  /**
   * Initializes the contact panel
   */
  init() {
    this.section = document.querySelector('.contact-panel');
    
    if (!this.section) {
      return;
    }

    // Initial phone visibility
    const currentTheme = document.body.dataset.theme || 'girls';
    this.updatePhoneVisibility(currentTheme);

    this.setupEventListeners();
  }

  /**
   * Shows/hides phone numbers based on theme
   * boys -> 48 40, girls -> 48 41
   */
  updatePhoneVisibility(theme) {
    const boysPhone = document.querySelector('[data-phone-boys]');
    const girlsPhone = document.querySelector('[data-phone-girls]');
    
    if (boysPhone) boysPhone.style.display = theme === 'boys' ? '' : 'none';
    if (girlsPhone) girlsPhone.style.display = theme === 'girls' ? '' : 'none';
  }

  /**
   * Listen for theme changes to potentially adjust visuals if needed
   */
  setupEventListeners() {
    this.themeListener = (e) => {
      const theme = e.detail.theme || 'girls';
      this.updatePhoneVisibility(theme);
      scrollEngine.refresh();
    };
    window.addEventListener('themeChanged', this.themeListener);
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.themeListener) {
      window.removeEventListener('themeChanged', this.themeListener);
    }
  }
}

export default new ContactPanel();
