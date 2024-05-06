import { element, by, expect } from 'detox';

describe('log-in', () => {
  beforeEach(async () => {
    await device.openURL({url: 'exp+my-app://'});
  });

  it('accepts collect username, name, email, and password', async () => {
    await element(by.text('Create Account')).tap();
    await expect(element(by.id('authenticator__text-field__input-username'))).toBeVisible();
    await expect(element(by.id('authenticator__text-field__input-email'))).toBeVisible();
    await expect(element(by.id('authenticator__text-field__input-password'))).toBeVisible();
    await expect(element(by.id('authenticator__text-field__input-confirm_password'))).toBeVisible();
    // await expect(element(by.id('authenticator__text-field__input-name'))).toBeVisible();
  });
});
