/// <reference types="detox" />

describe('log-in', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.text('Create Account')).tap();
  });

  it('accepts collect username, name, email, and password', async () => {
    await expect(element(by.id('authenticator__text-field__input-username'))).toBeVisible();
    await expect(element(by.id('authenticator__text-field__input-email'))).toBeVisible();
    await expect(element(by.id('authenticator__text-field__input-password'))).toBeVisible();
    await expect(element(by.id('authenticator__text-field__input-confirm_password'))).toBeVisible();
    // await expect(element(by.id('authenticator__text-field__input-name'))).toBeVisible();
  });
});
