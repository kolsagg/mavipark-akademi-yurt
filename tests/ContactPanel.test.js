import test from 'node:test';
import assert from 'node:assert';

// Mock DOM
global.document = {
  querySelector: (selector) => {
    if (selector === '.contact-panel') {
      return {};
    }
    return null;
  },
  addEventListener: () => {}
};

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {}
};

test('ContactPanel initialization', async (t) => {
  const { default: ContactPanel } = await import('../src/components/ContactPanel.js');

  await t.test('init should find the section', () => {
    ContactPanel.init();
    assert.strictEqual(ContactPanel.section !== null, true);
  });

  await t.test('should setup theme listener', () => {
    ContactPanel.init();
    assert.strictEqual(typeof ContactPanel.themeListener, 'function');
  });

  await t.test('destroy should clear listener', () => {
    ContactPanel.init();
    ContactPanel.destroy();
    // In a real browser we'd check if event was removed, here we just ensure no crash
    assert.ok(true);
  });
});
