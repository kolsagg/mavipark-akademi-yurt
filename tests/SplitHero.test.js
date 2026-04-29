import test from 'node:test';
import assert from 'node:assert';

// Mock DOM
global.document = {
  querySelector: () => ({}),
  querySelectorAll: () => []
};

global.window = {
  matchMedia: (query) => ({
    matches: query === '(hover: hover)',
    addEventListener: () => {}
  })
};

test('SplitHero GSAP Animation and Events', async (t) => {
  let SplitHero, initSplitHero;
  try {
    const module = await import('../src/components/SplitHero.js');
    SplitHero = module.SplitHero;
    initSplitHero = module.initSplitHero;
  } catch (e) {
    console.error(e);
  }

  await t.test('SplitHero module exists', () => {
    assert.ok(SplitHero, 'SplitHero class should exist');
  });

  await t.test('SplitHero should bind mouseenter and mouseleave on panels', () => {
    const panels = [
      { 
        addEventListener: function(e, cb) { this.events = this.events || {}; this.events[e] = cb; },
        querySelector: () => ({})
      },
      { 
        addEventListener: function(e, cb) { this.events = this.events || {}; this.events[e] = cb; },
        querySelector: () => ({})
      }
    ];
    
    // Mock the DOM interaction
    const container = { querySelectorAll: () => panels };
    
    const hero = new SplitHero();
    hero.container = container;
    hero.panels = panels;
    hero.mediaQuery = { matches: false };
    
    // Replace gsap mock inside test or assume class binds events
    hero.initEvents(); 
    
    assert.ok(panels[0].events && panels[0].events['mouseenter'], 'Should have mouseenter event');
    assert.ok(panels[0].events && panels[0].events['mouseleave'], 'Should have mouseleave event');
  });
});
