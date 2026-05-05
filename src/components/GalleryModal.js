/**
 * GalleryModal.js
 * Lightbox galeri popup. Oda kartına tıklayınca açılır.
 * Resim gezme (prev/next), video oynatma, keyboard & touch desteği.
 */

import gsap from 'gsap';

class GalleryModal {
  constructor() {
    this.overlay = null;
    this.currentIndex = 0;
    this.items = [];
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  /**
   * Opens the gallery modal with given items
   * @param {Array} items - [{type: 'image'|'video', src, alt}]
   * @param {number} startIndex - which item to show first
   */
  open(items, startIndex = 0) {
    if (!items || items.length === 0) return;
    
    this.items = items;
    this.currentIndex = startIndex;
    this.isOpen = true;

    this.createDOM();
    this.renderItem();
    this.bindEvents();
    this.animateIn();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    this.animateOut(() => {
      this.destroyDOM();
      document.body.style.overflow = '';
    });
  }

  createDOM() {
    // Remove any existing modal
    this.destroyDOM();

    this.overlay = document.createElement('div');
    this.overlay.className = 'gallery-modal';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'Oda Galerisi');
    this.overlay.innerHTML = `
      <div class="gallery-modal__backdrop"></div>
      <div class="gallery-modal__container">
        <button class="gallery-modal__close" aria-label="Galeriyi kapat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="gallery-modal__content"></div>
        <button class="gallery-modal__nav gallery-modal__nav--prev" aria-label="Önceki">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="gallery-modal__nav gallery-modal__nav--next" aria-label="Sonraki">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div class="gallery-modal__counter"></div>
        <div class="gallery-modal__thumbnails"></div>
      </div>
    `;

    document.body.appendChild(this.overlay);
    this.renderThumbnails();
  }

  destroyDOM() {
    if (this.overlay) {
      // Pause any playing video
      const video = this.overlay.querySelector('video');
      if (video) video.pause();

      this.overlay.remove();
      this.overlay = null;
    }
    this.unbindEvents();
  }

  renderItem() {
    if (!this.overlay) return;

    const content = this.overlay.querySelector('.gallery-modal__content');
    const counter = this.overlay.querySelector('.gallery-modal__counter');
    const item = this.items[this.currentIndex];

    // Pause previous video if any
    const prevVideo = content.querySelector('video');
    if (prevVideo) prevVideo.pause();

    if (item.type === 'video') {
      content.innerHTML = `
        <video 
          class="gallery-modal__video" 
          controls 
          preload="metadata"
          playsinline
          aria-label="${item.alt}"
        >
          <source src="${item.src}" type="video/webm">
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>
      `;
    } else {
      content.innerHTML = `
        <img 
          class="gallery-modal__image" 
          src="${item.src}" 
          alt="${item.alt}" 
          loading="eager"
          draggable="false"
        >
      `;
    }

    counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;

    // Update nav button visibility
    const prevBtn = this.overlay.querySelector('.gallery-modal__nav--prev');
    const nextBtn = this.overlay.querySelector('.gallery-modal__nav--next');
    if (prevBtn) prevBtn.style.display = this.items.length <= 1 ? 'none' : '';
    if (nextBtn) nextBtn.style.display = this.items.length <= 1 ? 'none' : '';

    // Update active thumbnail
    this.updateActiveThumbnail();

    // Animate content in
    gsap.fromTo(content.firstElementChild, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
  }

  renderThumbnails() {
    if (!this.overlay) return;
    const container = this.overlay.querySelector('.gallery-modal__thumbnails');
    if (!container) return;

    container.innerHTML = this.items.map((item, i) => {
      if (item.type === 'video') {
        return `
          <button class="gallery-modal__thumb gallery-modal__thumb--video${i === this.currentIndex ? ' is-active' : ''}" 
                  data-index="${i}" aria-label="Video ${i + 1}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        `;
      }
      return `
        <button class="gallery-modal__thumb${i === this.currentIndex ? ' is-active' : ''}" 
                data-index="${i}" aria-label="Görsel ${i + 1}">
          <img src="${item.src}" alt="${item.alt || `Görsel ${i + 1}`}" loading="lazy" draggable="false">
        </button>
      `;
    }).join('');
  }

  updateActiveThumbnail() {
    if (!this.overlay) return;
    const thumbs = this.overlay.querySelectorAll('.gallery-modal__thumb');
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === this.currentIndex);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.renderItem();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.renderItem();
  }

  goTo(index) {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.renderItem();
    }
  }

  bindEvents() {
    this._onKeyDown = (e) => {
      if (!this.isOpen) return;
      switch (e.key) {
        case 'Escape': this.close(); break;
        case 'ArrowRight': this.next(); break;
        case 'ArrowLeft': this.prev(); break;
      }
    };
    document.addEventListener('keydown', this._onKeyDown);

    if (!this.overlay) return;

    // Close on backdrop click
    this._onBackdropClick = (e) => {
      if (e.target.classList.contains('gallery-modal__backdrop') || 
          e.target.classList.contains('gallery-modal__content')) {
        this.close();
      }
    };
    this.overlay.addEventListener('click', this._onBackdropClick);

    // Close button
    const closeBtn = this.overlay.querySelector('.gallery-modal__close');
    if (closeBtn) {
      this._onClose = () => this.close();
      closeBtn.addEventListener('click', this._onClose);
    }

    // Nav buttons
    const prevBtn = this.overlay.querySelector('.gallery-modal__nav--prev');
    const nextBtn = this.overlay.querySelector('.gallery-modal__nav--next');
    if (prevBtn) {
      this._onPrev = () => this.prev();
      prevBtn.addEventListener('click', this._onPrev);
    }
    if (nextBtn) {
      this._onNext = () => this.next();
      nextBtn.addEventListener('click', this._onNext);
    }

    // Thumbnail clicks
    const thumbContainer = this.overlay.querySelector('.gallery-modal__thumbnails');
    if (thumbContainer) {
      this._onThumbClick = (e) => {
        const thumb = e.target.closest('[data-index]');
        if (thumb) this.goTo(parseInt(thumb.dataset.index, 10));
      };
      thumbContainer.addEventListener('click', this._onThumbClick);
    }

    // Touch swipe
    const content = this.overlay.querySelector('.gallery-modal__content');
    if (content) {
      this._onTouchStart = (e) => { this.touchStartX = e.changedTouches[0].screenX; };
      this._onTouchEnd = (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? this.next() : this.prev();
        }
      };
      content.addEventListener('touchstart', this._onTouchStart, { passive: true });
      content.addEventListener('touchend', this._onTouchEnd, { passive: true });
    }
  }

  unbindEvents() {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  animateIn() {
    if (!this.overlay) return;
    gsap.fromTo(this.overlay, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(this.overlay.querySelector('.gallery-modal__container'),
      { scale: 0.9, y: 30 },
      { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 }
    );
  }

  animateOut(onComplete) {
    if (!this.overlay) { onComplete?.(); return; }
    gsap.to(this.overlay, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete
    });
  }
}

// Singleton
export const galleryModal = new GalleryModal();
