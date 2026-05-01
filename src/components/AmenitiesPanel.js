import { amenitiesData } from '../core/data/amenities.js';
import { scrollEngine } from '../core/ScrollEngine.js';
import { gsap } from 'gsap';

/**
 * AmenitiesPanel Component
 * Handles dynamic rendering of common and theme-specific amenities.
 */
class AmenitiesPanel {
  constructor() {
    this.container = null;
    this.currentTheme = null;
    this.ctx = null;
    this.currentTransition = null;
    this.themeListener = null;
  }

  /**
   * Initializes the amenities panel
   */
  init() {
    this.container = document.querySelector('[data-amenities-panel-grid]');
    
    if (!this.container) {
      console.warn('[AmenitiesPanel] Grid container not found');
      return;
    }

    this.currentTheme = document.body.dataset.theme || 'girls';
    
    this.ctx = gsap.context(() => {
      this.renderAmenities();
      // Animation handled by ScrollEngine
    }, this.container);

    this.setupEventListeners();
    
    console.log('AmenitiesPanel initialized');
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.themeListener) {
      window.removeEventListener('themeChanged', this.themeListener);
    }
    if (this.ctx) {
      this.ctx.revert();
      this.ctx = null;
    }
  }

  /**
   * Renders amenity cards based on theme
   */
  renderAmenities() {
    if (!this.container) return;

    const themeKey = this.currentTheme === 'boys' ? 'erkek' : 'kiz';
    const common = (amenitiesData && amenitiesData.common) || [];
    const specific = (amenitiesData && amenitiesData[themeKey]) || [];
    
    const allAmenities = [...common, ...specific];

    this.container.innerHTML = '';
    
    allAmenities.forEach((amenity, index) => {
      const cardHtml = this.createCardHtml(amenity, index);
      this.container.insertAdjacentHTML('beforeend', cardHtml);
    });
  }

  /**
   * Creates HTML for a single amenity card
   */
  createCardHtml(amenity, index) {
    return `
      <div class="glass-card" data-glass-card data-amenity-index="${index}" data-reveal-batch>
        <div class="glass-card__image-wrapper">
          <img src="${amenity.image}" alt="İmkan Görseli: ${amenity.title}" class="glass-card__image" loading="lazy" data-fallback="amenity">
        </div>
        <div class="glass-card__body">
          <h3 class="glass-card__title" style="display: flex; align-items: center; gap: 12px;">
            <span class="glass-card__list-icon" style="margin: 0; color: var(--theme-primary); line-height: 0;" aria-hidden="true">${this.getIcon(amenity.icon)}</span>
            ${amenity.title}
          </h3>
          <p class="glass-card__description">${amenity.description}</p>
        </div>
      </div>
    `;
  }

  /**
   * Returns SVG icon
   */
  getIcon(iconName) {
    const icons = {
      security: '<svg viewBox="0 0 24 24"><path d="M12,17A2,2 0 0,0 14,15C14,14.21 13.54,13.5 12.9,13.18L13.1,11H10.9L11.1,13.18C10.46,13.5 10,14.21 10,15A2,2 0 0,0 12,17M18,8H17V6A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M9,6A3,3 0 0,1 15,6V8H9V6Z"/></svg>',
      cleaning: '<svg viewBox="0 0 24 24"><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,10.23L14.82,17.82L14.13,22.7C11.89,22.36 9.49,21.13 7.48,19.12L5.93,17.57Z"/></svg>',
      wifi: '<svg viewBox="0 0 24 24"><path d="M12,3C7.79,3 3.7,4.41 0.38,7.06L1.65,8.64C4.62,6.28 8.22,5 12,5C15.78,5 19.38,6.28 22.35,8.64L23.62,7.06C20.3,4.41 16.21,3 12,3M12,9C9.3,9 6.7,9.89 4.56,11.54L5.83,13.12C7.62,11.77 9.77,11 12,11C14.23,11 16.38,11.77 18.17,13.12L19.44,11.54C17.3,9.89 14.7,9 12,9M12,15C10.65,15 9.4,15.45 8.4,16.21L12,20.66L15.6,16.21C14.6,15.45 13.35,15 12,15Z"/></svg>',
      desk: '<svg viewBox="0 0 24 24"><path d="M4,18V11H20V18H22V11A2,2 0 0,0 20,9H4A2,2 0 0,0 2,11V18H4M2,19V20H5V19H19V20H22V19H2V19Z"/></svg>',
      coffee: '<svg viewBox="0 0 24 24"><path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M6,5V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5H6Z"/></svg>',
      gym: '<svg viewBox="0 0 24 24"><path d="M21,11.5V11C21,10.45 20.55,10 20,10H18V7H20V6A1,1 0 0,0 19,5H17V2H15V5H13V2H11V5H9V2H7V5H5A1,1 0 0,0 4,6V7H6V10H4C3.45,10 3,10.45 3,11V11.5A1,1 0 0,0 4,12.5V14.5A1,1 0 0,0 3,15.5V16C3,16.55 3.45,17 4,17H6V22H8V17H11V22H13V17H16V22H18V17H20C20.55,17 21,16.55 21,16V15.5A1,1 0 0,0 20,14.5V12.5A1,1 0 0,0 21,11.5M16,15H8V12H16V15Z"/></svg>'
    };
    return icons[iconName] || '<svg viewBox="0 0 24 24"><path d="M11,9H13V7H11V9M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"/></svg>';
  }

  /**
   * Refreshes animations
   */
  setupAnimations() {
    scrollEngine.refresh();
  }

  /**
   * Listen for theme changes
   */
  setupEventListeners() {
    this.themeListener = (e) => {
      const newTheme = e.detail.theme || 'girls';
      if (newTheme !== this.currentTheme) {
        this.handleThemeChange(newTheme);
      }
    };
    
    window.addEventListener('themeChanged', this.themeListener);
  }

  /**
   * Handles theme change by re-rendering amenities
   */
  handleThemeChange(newTheme) {
    if (!this.container) return;

    if (this.currentTransition) this.currentTransition.kill();
    if (this.ctx) this.ctx.revert();
    
    this.currentTheme = newTheme;
    
    this.ctx = gsap.context(() => {
      this.renderAmenities();
      this.setupAnimations();
    }, this.container);
  }
}

export default new AmenitiesPanel();
