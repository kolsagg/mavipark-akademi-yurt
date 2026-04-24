/**
 * Akademi Suit - Main Entry Point
 * Bootstrap & Global State Initialization
 */

import './styles/design-tokens.css';
import './styles/main.css';
import { animationEngine } from './core/AnimationEngine';

/**
 * Application bootstrap
 * Initializes global state and mounts components
 */
function initApp() {
  // Start preloader visuals immediately
  animationEngine.initPreloader();

  const app = document.getElementById('app');

  if (!app) {
    console.error('[AkademiSuit] #app element not found');
    return;
  }

  // Placeholder content
  app.innerHTML = `
    <main class="app-container">
      <h1>Akademi Suit</h1>
      <p>Premium Öğrenci Yurdu</p>
    </main>
  `;

  console.info('[AkademiSuit] App initialized');
}

// Boot sequence
document.addEventListener('DOMContentLoaded', initApp);

// Exit preloader when everything is fully loaded
window.addEventListener('load', () => {
  // Small delay for perceived performance/aesthetic
  setTimeout(() => {
    animationEngine.exitPreloader().then(() => {
      console.info('[AkademiSuit] Preloader exit complete');
    });
  }, 500);
});
