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

    this.setupEventListeners();
  }

  /**
   * Listen for theme changes to potentially adjust visuals if needed
   */
  setupEventListeners() {
    this.themeListener = (e) => {
      // Re-trigger scroll animations or refresh if needed
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
