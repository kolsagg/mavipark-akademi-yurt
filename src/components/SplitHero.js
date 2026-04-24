export class SplitHero {
  constructor() {
    this.container = document.querySelector('.split-hero');
    this.panels = document.querySelectorAll('.split-hero__panel');
    
    if (!this.container || this.panels.length === 0) return;
    
    this.init();
  }

  init() {
    // Check for persisted theme from previous session (Story 2.3 prep)
    const savedTheme = localStorage.getItem('akademisuit_theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
    }
    
    this.initEvents();
  }
  
  initEvents() {
    this.panels.forEach(panel => {
      panel.addEventListener('click', (e) => {
        const theme = panel.dataset.panel;
        this.selectTheme(theme);
      });
    });
  }
  
  selectTheme(theme) {
    console.info(`[SplitHero] Selected theme: ${theme}`);
    
    // Set theme on body for CSS tokens
    document.body.setAttribute('data-theme', theme);
    
    // Persist choice for Story 2.3 routing logic
    localStorage.setItem('akademisuit_theme', theme);

    // Visual feedback for click
    this.panels.forEach(p => p.classList.remove('is-active'));
    const activePanel = Array.from(this.panels).find(p => p.dataset.panel === theme);
    if (activePanel) activePanel.classList.add('is-active');
  }
}

export function initSplitHero() {
  return new SplitHero();
}
