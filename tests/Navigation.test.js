import test from 'node:test';
import assert from 'node:assert';

// Mock DOM
global.window = {
  addEventListener: (name, cb) => {
    global.window.listeners = global.window.listeners || {};
    global.window.listeners[name] = cb;
  },
  CustomEvent: class {
    constructor(name, opts) {
      this.name = name;
      this.detail = opts.detail;
    }
  }
};

global.document = {
  querySelectorAll: (selector) => [],
  querySelector: (selector) => null,
  body: {
    dataset: {}
  }
};

test('Navigation Component RED Phase', async (t) => {
  let Navigation;
  try {
    const module = await import('../src/components/Navigation.js');
    Navigation = module.default;
  } catch (e) {
    // Expected to fail if file doesn't exist
  }

  await t.test('Navigation should be initialized', () => {
    assert.ok(Navigation, 'Navigation module should exist');
  });

  await t.test('init should add event listener for themeChanged', () => {
    if (Navigation && Navigation.init) Navigation.init();
    assert.ok(global.window.listeners && global.window.listeners['themeChanged'], 'themeChanged listener should be registered');
  });

  await t.test('updatePill should set aria-pressed on target button', () => {
    const btnGirls = { dataset: { themeTarget: 'girls' }, setAttribute: (k, v) => { btnGirls[k] = v; } };
    const btnBoys = { dataset: { themeTarget: 'boys' }, setAttribute: (k, v) => { btnBoys[k] = v; } };
    Navigation.buttons = [btnGirls, btnBoys];
    Navigation.pill = {}; // Mock pill object for GSAP

    Navigation.updatePill('girls');
    assert.strictEqual(btnGirls['aria-pressed'], 'true');
    assert.strictEqual(btnBoys['aria-pressed'], 'false');

    Navigation.updatePill('boys');
    assert.strictEqual(btnGirls['aria-pressed'], 'false');
    assert.strictEqual(btnBoys['aria-pressed'], 'true');
  });
});
