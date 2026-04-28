/**
 * Akademi Suit - Main Entry Point
 * Bootstrap & Global State Initialization
 */

import './styles/design-tokens.css';
import './styles/main.css';
import { animationEngine } from './core/AnimationEngine';
import { initSplitHero } from './components/SplitHero';
import ThemeManager from './core/ThemeManager';
import Navigation from './components/Navigation';
import GlassCard from './components/GlassCard';
import RoomPanel from './components/RoomPanel';
import AmenitiesPanel from './components/AmenitiesPanel';
import Hero from './components/Hero';
import ContactPanel from './components/ContactPanel';
import { floatingCTA } from './components/FloatingCTA';
import { scrollEngine } from './core/ScrollEngine';

/**
 * Application bootstrap
 * Initializes global state and mounts components
 */
function initApp() {
  // Start preloader visuals immediately
  animationEngine.initPreloader();

  const app = document.getElementById('app');

  if (!app) {
    console.warn('[AkademiSuit] #app container not found, skipping feature initialization');
    return;
  }

  // Initialize URL-First Theme Management
  ThemeManager.init();

  // Initialize Navigation Switcher
  Navigation.init();

  // Initialize Glass Cards
  GlassCard.init();

  // Initialize Room Panel
  RoomPanel.init();

  // Initialize Amenities Panel
  AmenitiesPanel.init();

  // Initialize Contact Panel
  ContactPanel.init();

  // Initialize Scroll Animations
  scrollEngine.init();

  // Initialize Floating CTA
  floatingCTA.init();

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
