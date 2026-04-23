/**
 * Akademi Suit - Main Entry Point
 * Bootstrap & Global State Initialization
 */

import './styles/main.css';

/**
 * Application bootstrap
 * Initializes global state and mounts components
 */
function initApp() {
  const app = document.getElementById('app');

  if (!app) {
    console.error('[AkademiSuit] #app element not found');
    return;
  }

  // Placeholder content — will be replaced by actual components in subsequent stories
  app.innerHTML = `
    <main class="app-container">
      <h1>Akademi Suit</h1>
      <p>Premium Öğrenci Yurdu</p>
    </main>
  `;

  console.info('[AkademiSuit] App initialized');
}

// Boot
document.addEventListener('DOMContentLoaded', initApp);
