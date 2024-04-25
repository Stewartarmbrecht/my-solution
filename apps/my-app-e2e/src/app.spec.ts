import { device, element, by, expect } from 'detox';

describe('MyApp', () => {
  beforeEach(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('should display welcome message', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible();
  });
});
