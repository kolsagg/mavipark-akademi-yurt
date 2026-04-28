import test from 'node:test';
import assert from 'node:assert';

// Mock DOM before importing the module
global.window = {
  location: { search: '', pathname: '/' },
  history: {
    pushState: (state, unused, url) => {
      const parsed = new URL(url, 'http://localhost');
      global.window.location.search = parsed.search;
      global.window.location.pathname = parsed.pathname;
    }
  },
  dispatchEvent: (event) => {
    global.window.lastDispatchedEvent = event;
  }
};

global.document = {
  body: {
    dataset: {}
  }
};

global.CustomEvent = class CustomEvent {
  constructor(name, opts) {
    this.name = name;
    this.detail = opts ? opts.detail : null;
  }
};

// Now import the module (which doesn't exist yet, so we expect a failure)
test('ThemeManager tests', async (t) => {
  // We will dynamically import to allow the first test to run even if the file doesn't exist
  let ThemeManager;
  try {
    const module = await import('../src/core/ThemeManager.js');
    ThemeManager = module.default;
  } catch (e) {
    // If it fails to import, the tests below will fail which is expected for RED phase
  }

  await t.test('getThemeFromURL should handle case insensitivity', () => {
    global.window.location.search = '?type=GIRLS';
    assert.strictEqual(ThemeManager.getThemeFromURL(), 'girls');
  });

  await t.test('getThemeFromURL should read from pathname segments', () => {
    global.window.location.search = '';
    global.window.location.pathname = '/kiz/hakkimizda';
    assert.strictEqual(ThemeManager.getThemeFromURL(), 'girls');

    global.window.location.pathname = '/ERKEK';
    assert.strictEqual(ThemeManager.getThemeFromURL(), 'boys');
  });

  await t.test('applyTheme should clear theme if null is provided', () => {
    global.document.body.dataset.theme = 'girls';
    ThemeManager.applyTheme(null);
    assert.strictEqual(global.document.body.dataset.theme, undefined);
    assert.strictEqual(global.window.lastDispatchedEvent.detail.theme, null);
  });
});
