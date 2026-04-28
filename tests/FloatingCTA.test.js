import test from 'node:test';
import assert from 'node:assert';

// Mock DOM
const mockNavigator = {
  userAgent: '',
  clipboard: {
    writeText: async (text) => {
      mockNavigator.lastCopied = text;
    }
  }
};

Object.defineProperty(global, 'navigator', {
  value: mockNavigator,
  writable: true,
  configurable: true
});

global.window = {
  location: { href: '' },
  navigator: mockNavigator
};

global.document = {
  getElementById: (id) => {
    if (id === 'floating-cta' || id === 'cta-call-button') {
      return { addEventListener: () => {} };
    }
    return null;
  },
  querySelector: () => null,
  createElement: () => ({
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    remove: () => {},
    setAttribute: () => {},
    style: {}
  }),
  body: {
    appendChild: () => {},
  }
};

global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

// Mock GSAP
global.gsap = {
  context: (fn) => { fn(); return { revert: () => {} }; },
  fromTo: () => {},
  to: () => {}
};

test('FloatingCTA Logic Tests', async (t) => {
  const { floatingCTA } = await import('../src/components/FloatingCTA.js');

  await t.test('handleAction should set window.location.href on mobile', () => {
    // window.innerWidth is used for mobile detection now
    global.window.innerWidth = 500;
    floatingCTA.handleAction();
    assert.strictEqual(global.window.location.href, 'tel:+905555555555');
  });

  await t.test('handleAction should use clipboard on desktop', async () => {
    global.window.innerWidth = 1200;
    global.navigator.lastCopied = '';
    await floatingCTA.handleAction();
    assert.strictEqual(global.navigator.lastCopied, '+905555555555');
  });
});
