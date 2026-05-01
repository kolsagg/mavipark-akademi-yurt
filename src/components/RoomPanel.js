import { roomData } from '../core/data/rooms.js';
import { scrollEngine } from '../core/ScrollEngine.js';
import { galleryModal } from './GalleryModal.js';
import { gsap } from 'gsap';

/**
 * RoomPanel Component
 * Handles dynamic room rendering based on theme and scroll animations.
 */
class RoomPanel {
  constructor() {
    this.container = null;
    this.section = null;
    this.currentTheme = null;
    this.ctx = null;
    this.themeListener = null;
    this.currentTransition = null;
  }

  /**
   * Initializes the room panel
   */
  init() {
    this.container = document.querySelector('[data-room-panel-grid]');
    this.section = document.querySelector('.room-panel');
    
    if (!this.container) {
      console.warn('[RoomPanel] Grid container not found');
      return;
    }

    this.currentTheme = document.body.dataset.theme || 'girls';
    
    this.ctx = gsap.context(() => {
      this.renderRooms();
      // Animation handled by ScrollEngine
    }, this.container);

    this.setupEventListeners();
    
    console.log('RoomPanel initialized');
  }

  /**
   * Cleanup method to revert animations and clear context
   */
  destroy() {
    if (this.themeListener) {
      window.removeEventListener('themeChanged', this.themeListener);
    }
    if (this.ctx) {
      this.ctx.revert();
      this.ctx = null;
    }
    if (this.currentTransition) {
      this.currentTransition.kill();
    }
  }

  /**
   * Renders room cards based on the current theme
   */
  renderRooms() {
    if (!this.container) return;

    const themeKey = this.currentTheme === 'boys' ? 'erkek' : 'kiz';
    const rooms = roomData[themeKey];
    
    if (!rooms) {
      console.warn(`No room data found for theme: ${themeKey}`);
      return;
    }

    // Clear the container
    this.container.innerHTML = '';
    
    // Inject room cards
    rooms.forEach((room, index) => {
      const cardHtml = this.createCardHtml(room, index);
      this.container.insertAdjacentHTML('beforeend', cardHtml);
    });
  }

  /**
   * Creates HTML string for a single room card
   * @param {Object} room - Room data object
   * @param {number} index - Index for animation delays
   */
  createCardHtml(room, index) {
    const featuresHtml = room.features.map(f => `
      <li class="glass-card__list-item">
        <span class="glass-card__list-icon" aria-hidden="true">${this.getIcon(f.icon)}</span>
        <span class="glass-card__list-text">${f.text}</span>
      </li>
    `).join('');

    const hasGallery = room.gallery && room.gallery.length > 0;
    const galleryHint = hasGallery ? `
      <div class="glass-card__gallery-hint">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>${room.gallery.length} Görsel</span>
      </div>
    ` : '';

    return `
      <div class="glass-card" data-glass-card data-room-id="${room.id}" data-room-index="${index}" data-reveal-batch data-clickable>
        <div class="glass-card__image-wrapper">
          <img src="${room.image}" alt="Oda Görseli: ${room.title}" class="glass-card__image" loading="lazy">
          ${galleryHint}
        </div>
        <div class="glass-card__body">
          <span class="room-type-badge">${room.tag}</span>
          <h3 class="glass-card__title">${room.title}</h3>
          <p class="glass-card__description">${room.description}</p>
          <ul class="glass-card__list">
            ${featuresHtml}
          </ul>
        </div>
        <div class="glass-card__footer">
          <span class="room-type-badge room-type-badge--outline">${room.type}</span>
        </div>
      </div>
    `;
  }

  /**
   * Returns SVG icon for feature
   * @param {string} iconName 
   */
  getIcon(iconName) {
    const icons = {
      bed: '<svg viewBox="0 0 24 24"><path d="M20,10V7A2,2 0 0,0 18,5H6A2,2 0 0,0 4,7V10A3,3 0 0,0 1,13V17H3V19H5V17H19V19H21V17H23V13A3,3 0 0,0 20,10M6,7H18V10H11V7H13V10H6V7M3,13A1,1 0 0,1 4,12H20A1,1 0 0,1 21,13V15H3V13Z"/></svg>',
      desk: '<svg viewBox="0 0 24 24"><path d="M4,18V11H20V18H22V11A2,2 0 0,0 20,9H4A2,2 0 0,0 2,11V18H4M2,19V20H5V19H19V20H22V19H2V19Z"/></svg>',
      bath: '<svg viewBox="0 0 24 24"><path d="M7,7C7,5.89 7.89,5 9,5H11V3H9C6.79,3 5,4.79 5,7V16H3V18H21V16H7V7M21,10V15H19V10H21M18,10H16V15H18V10M15,10H13V15H15V10Z"/></svg>',
      wardrobe: '<svg viewBox="0 0 24 24"><path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2H6M6,4H11V20H6V4M13,4H18V20H13V4Z"/></svg>',
      wifi: '<svg viewBox="0 0 24 24"><path d="M12,3C7.79,3 3.7,4.41 0.38,7.06L1.65,8.64C4.62,6.28 8.22,5 12,5C15.78,5 19.38,6.28 22.35,8.64L23.62,7.06C20.3,4.41 16.21,3 12,3M12,9C9.3,9 6.7,9.89 4.56,11.54L5.83,13.12C7.62,11.77 9.77,11 12,11C14.23,11 16.38,11.77 18.17,13.12L19.44,11.54C17.3,9.89 14.7,9 12,9M12,15C10.65,15 9.4,15.45 8.4,16.21L12,20.66L15.6,16.21C14.6,15.45 13.35,15 12,15Z"/></svg>',
      users: '<svg viewBox="0 0 24 24"><path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 1,0 8,5A3,3 0 0,0 8,11M16,11A3,3 0 1,0 16,5A3,3 0 0,0 16,11Z"/></svg>',
      balcony: '<svg viewBox="0 0 24 24"><path d="M2,10V22H4V20H20V22H22V10H20V18H18V10H16V18H14V10H12V18H10V10H8V18H6V10H4V18H2V10Z"/></svg>',
      fridge: '<svg viewBox="0 0 24 24"><path d="M7,2A2,2 0 0,0 5,4V19A2,2 0 0,0 7,21V22H9V21H15V22H17V21A2,2 0 0,0 19,19V4A2,2 0 0,0 17,2H7M7,4H17V9H7V4M7,11H17V19H7V11M8,12V15H10V12H8Z"/></svg>',
      storage: '<svg viewBox="0 0 24 24"><path d="M3,3H21V7H3V3M3,8H21V12H3V8M3,13H21V17H3V13M3,18H21V22H3V18Z"/></svg>',
      ac: '<svg viewBox="0 0 24 24"><path d="M2,11H22V15H21V16H20V15H4V16H3V15H2V11M2,7H22V9H2V7M21,17V18H20V17H21M19,17V18H18V17H19M17,17V18H16V17H17M4,17V18H3V17H4M6,17V18H5V17H6M8,17V18H7V17H8Z"/></svg>',
      tv: '<svg viewBox="0 0 24 24"><path d="M21,3H3C1.89,3 1,3.89 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5C23,3.89 22.1,3 21,3M21,17H3V5H21V17Z"/></svg>',
      security: '<svg viewBox="0 0 24 24"><path d="M12,17A2,2 0 0,0 14,15C14,14.21 13.54,13.5 12.9,13.18L13.1,11H10.9L11.1,13.18C10.46,13.5 10,14.21 10,15A2,2 0 0,0 12,17M18,8H17V6A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M9,6A3,3 0 0,1 15,6V8H9V6Z"/></svg>'
    };
    return icons[iconName] || '•';
  }

  /**
   * Refreshes scroll animations
   */
  setupAnimations() {
    scrollEngine.refresh();
  }

  /**
   * Listen for theme changes and card clicks
   */
  setupEventListeners() {
    this.themeListener = (e) => {
      const newTheme = e.detail.theme || 'girls';
      if (newTheme !== this.currentTheme) {
        this.handleThemeChange(newTheme);
      }
    };
    
    window.addEventListener('themeChanged', this.themeListener);

    // Card click handler (delegated) — opens gallery
    this.container.addEventListener('click', (e) => {
      const card = e.target.closest('[data-room-id]');
      if (!card) return;

      const roomId = card.dataset.roomId;
      const themeKey = this.currentTheme === 'boys' ? 'erkek' : 'kiz';
      const room = roomData[themeKey].find(r => r.id === roomId);

      if (room && room.gallery && room.gallery.length > 0) {
        galleryModal.open(room.gallery, 0);
      }
    });
  }

  /**
   * Handles theme change by re-rendering rooms
   * @param {string} newTheme 
   */
  handleThemeChange(newTheme) {
    if (!this.container) return;

    if (this.currentTransition) this.currentTransition.kill();
    if (this.ctx) this.ctx.revert();
    
    this.currentTheme = newTheme;
    
    this.ctx = gsap.context(() => {
      this.renderRooms();
      this.setupAnimations();
    }, this.container);
  }
}

export default new RoomPanel();
