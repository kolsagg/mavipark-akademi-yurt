class ThemeManager {
  /**
   * Initializes the ThemeManager
   */
  static init() {
    // Read theme from URL on load
    const theme = this.getThemeFromURL();
    this.applyTheme(theme); // Apply even if null to ensure clean state

    // Listen for history changes
    window.addEventListener('popstate', () => {
      const newTheme = this.getThemeFromURL();
      this.applyTheme(newTheme, false); // false to avoid recursive pushState
    });
  }

  /**
   * Reads theme from URL search params or path
   * @returns {string|null} 'girls' or 'boys' or null
   */
  static getThemeFromURL() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type')?.toLowerCase();
    
    if (type === 'girls' || type === 'boys') {
      return type;
    }

    // Fallback to pathname (check segments for precision)
    const pathSegments = window.location.pathname.toLowerCase().split('/');
    if (pathSegments.some(s => s.includes('kiz'))) return 'girls';
    if (pathSegments.some(s => s.includes('erkek'))) return 'boys';

    return null;
  }

  /**
   * Applies the theme to the body and dispatches event
   * @param {string|null} theme - 'girls' or 'boys' or null
   * @param {boolean} [updateHistory=true] - whether to update URL history
   */
  static applyTheme(theme, updateHistory = true) {
    // If theme is null, we can either clear it or keep default. 
    // Requirements say URL-First, so we clear if URL has no preference.
    if (theme && theme !== 'girls' && theme !== 'boys') return;

    if (theme) {
      document.body.dataset.theme = theme;
      if (updateHistory) this.updateURL(theme);
    } else {
      delete document.body.dataset.theme;
    }

    // Dispatch CustomEvent regardless of choice to let subscribers sync
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    window.dispatchEvent(event);
  }

  /**
   * Updates the URL search params without reloading the page
   * @param {string} theme - 'girls' or 'boys'
   */
  static updateURL(theme) {
    if (theme !== 'girls' && theme !== 'boys') return;

    const url = new URL(window.location.href || 'http://localhost');
    url.searchParams.set('type', theme);
    
    // We only want the path and search for pushState
    const newUrl = url.pathname + url.search;
    window.history.pushState({}, '', newUrl);
  }

  /**
   * Convenience method to set theme externally
   */
  static setTheme(theme) {
    this.applyTheme(theme, true);
  }
}

export default ThemeManager;
