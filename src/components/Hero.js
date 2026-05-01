import gsap from 'gsap';

/**
 * Hero Component
 * Manages dynamic content and animations for the premium hero section
 */
class Hero {
  constructor() {
    this.container = document.querySelector('.hero');
    if (!this.container) return;

    this.elements = {
      badge: this.container.querySelector('[data-hero-badge]'),
      titleMain: this.container.querySelector('[data-hero-title-main]'),
      titleAccent: this.container.querySelector('[data-hero-title-accent]'),
      desc: this.container.querySelector('[data-hero-desc]'),
      highlightTitle: this.container.querySelector('[data-hero-highlight-title]'),
      highlightDesc: this.container.querySelector('[data-hero-highlight-desc]'),
      img: this.container.querySelector('[data-hero-img]')
    };

    this.data = {
      girls: {
        badge: "Premium Girls' Residence",
        titleMain: "Zarafet ve Konforun",
        titleAccent: "Modern Hali",
        desc: "Odaklanmanız, rahatınız ve topluluğunuz için tasarlanmış bir sığınak deneyimi yaşayın. Akademik yolculuğunuzu yükselten butik bir yaşam tarzını keşfedin.",
        highlightTitle: "Güvenli & Huzurlu",
        highlightDesc: "7/24 güvenlik ve biyometrik geçiş sistemleri ile içiniz rahat olsun.",
        image: "/assets/hero.webp"
      },
      boys: {
        badge: "Premium Boys' Residence",
        titleMain: "Modern ve Dinamik",
        titleAccent: "Yaşam Alanı",
        desc: "Başarıya giden yolda, konfor ve disiplini birleştiren bir ortam keşfedin. Modern donanımları ve merkezi konumuyla yeni nesil yurt deneyimi.",
        highlightTitle: "Merkezi & Kolay",
        highlightDesc: "Üniversitelere ve sosyal alanlara yürüme mesafesinde stratejik konum.",
        image: "/assets/hero.webp"
      }
    };

    this.init();
  }

  init() {
    // Listen for theme changes to apply content
    window.addEventListener('themeChanged', (e) => {
      this.updateContent(e.detail.theme);
    });

    // Initial load
    const currentTheme = document.body.dataset.theme;
    if (currentTheme) {
      this.updateContent(currentTheme);
    }
  }

  /**
   * Updates hero content
   * @param {string} theme - 'girls' or 'boys'
   */
  updateContent(theme) {
    this.currentTheme = theme;
    const content = this.data[theme];
    if (!content) return;

    this.applyContent(content);
  }

  applyContent(content) {
    if (this.elements.badge) this.elements.badge.textContent = content.badge;
    if (this.elements.titleMain) this.elements.titleMain.textContent = content.titleMain;
    if (this.elements.titleAccent) this.elements.titleAccent.textContent = content.titleAccent;
    if (this.elements.desc) this.elements.desc.textContent = content.desc;
    if (this.elements.highlightTitle) this.elements.highlightTitle.textContent = content.highlightTitle;
    if (this.elements.highlightDesc) this.elements.highlightDesc.textContent = content.highlightDesc;
    if (this.elements.img) {
      this.elements.img.src = content.image;
      const typeLabel = content.badge.includes('Girls') ? 'Kız' : 'Erkek';
      this.elements.img.alt = `Akademi Suit - ${typeLabel} Yurdu Konaklama Alanı`;
    }
  }
}

export default new Hero();
