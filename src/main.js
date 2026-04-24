/**
 * Akademi Suit - Main Entry Point
 * Bootstrap & Global State Initialization
 */

import './styles/design-tokens.css';
import './styles/main.css';
import { animationEngine } from './core/AnimationEngine';
import { initSplitHero } from './components/SplitHero';

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

  // Initialize SplitHero interactions
  initSplitHero();

  console.info('[AkademiSuit] App initialized');
}

// Boot sequence
document.addEventListener('DOMContentLoaded', initApp);

// Exit preloader when everything is fully loaded
function triggerPreloaderExit() {
  // Small delay for perceived performance/aesthetic
  setTimeout(() => {
    animationEngine.exitPreloader().then(() => {
      console.info('[AkademiSuit] Preloader exit complete');
      
      // Start Split Hero Intro Animation
      animationEngine.introSplitHero().then(() => {
        console.info('[AkademiSuit] Hero intro complete');
      });
    });
  }, 500);
}

// Fallback: if load event already fired before listener attached
if (document.readyState === 'complete') {
  triggerPreloaderExit();
} else {
  window.addEventListener('load', triggerPreloaderExit);
}
