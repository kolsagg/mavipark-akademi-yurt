import ThemeManager from '../core/ThemeManager';

export class SplitHero {
  constructor() {
    this.container = document.querySelector('.split-hero');
    this.panels = document.querySelectorAll('.split-hero__panel');
    
    if (!this.container || this.panels.length === 0) return;
    
    this.init();
  }

  init() {
    // ThemeManager handles URL-first theme loading now
    
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
}

export function initSplitHero() {
  return new SplitHero();
}
