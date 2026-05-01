/**
 * Akademi Suit - Main Entry Point
 * Bootstrap & Global State Initialization
 */

import './styles/design-tokens.css';
import './styles/main.css';
import { animationEngine } from './core/AnimationEngine';
import ThemeManager from './core/ThemeManager';
import { scrollEngine } from './core/ScrollEngine';
import { setupImageErrorHandling } from './core/utils';
import { floatingCTA } from './components/FloatingCTA';

/**
 * Application bootstrap
 * Initializes global state and mounts components
 */
async function initApp() {
  // Start preloader visuals immediately
  animationEngine.initPreloader();

  const app = document.getElementById('app');

  if (!app) {
    console.warn('[AkademiSuit] #app container not found, skipping feature initialization');
    return;
  }

  // Initialize Core Engines (Always needed)
  ThemeManager.init();
  setupImageErrorHandling();
  scrollEngine.init();
  floatingCTA.init();

  // Dynamic Component Loading Tasks
  const initTasks = [];

  // Navigation (Part of layout, usually always there except if omitted)
  if (document.querySelector('.nav')) {
    initTasks.push(import('./components/Navigation').then(m => m.default.init()));
  }

  // Components based on DOM presence
  if (document.querySelector('.split-hero')) {
    initTasks.push(import('./components/SplitHero').then(m => m.initSplitHero()));
  }

  if (document.querySelector('.glass-card')) {
    initTasks.push(import('./components/GlassCard').then(m => m.default.init()));
  }

  if (document.querySelector('.room-panel')) {
    initTasks.push(import('./components/RoomPanel').then(m => m.default.init()));
  }

  if (document.querySelector('.amenities-panel')) {
    initTasks.push(import('./components/AmenitiesPanel').then(m => m.default.init()));
  }

  if (document.querySelector('.contact-panel')) {
    initTasks.push(import('./components/ContactPanel').then(m => m.default.init()));
  }

  if (document.querySelector('.hero')) {
    initTasks.push(import('./components/Hero').then(m => m.default.init()));
  }

  // Wait for all components to initialize
  await Promise.all(initTasks);

  // Refresh ScrollEngine to pick up dynamically injected content
  scrollEngine.refresh();

  console.info('[AkademiSuit] App initialized (Dynamic)');
}

// Boot sequence
document.addEventListener('DOMContentLoaded', initApp);

// Exit preloader when everything is fully loaded
function triggerPreloaderExit() {
  // Small delay for perceived performance/aesthetic
  setTimeout(() => {
    document.body.classList.add('app-ready');
    animationEngine.exitPreloader().then(() => {
      console.info('[AkademiSuit] Preloader exit complete');
      
      // Attempt to start animations for whatever is on current page
      Promise.all([
        animationEngine.introSplitHero(),
        animationEngine.introPageContent()
      ]).then(() => {
        console.info('[AkademiSuit] Page intros complete');
      }).catch(err => {
        console.warn('[AkademiSuit] Intro animations failed:', err);
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
