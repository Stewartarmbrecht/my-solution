import { element, by, expect } from 'detox';

describe('MyApp', () => {
  beforeEach(async () => {
    await device.openURL({url: 'exp+my-app://'});
  });

  it('should display welcome message', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible();
  });
  it('accepts user name and password', async () => {
    await expect(element(by.id('authenticator__text-field__input-username'))).toBeVisible();
    await expect(element(by.id('authenticator__text-field__input-password'))).toBeVisible();
  })
  it('includes a link for forgotten password', async () => {
    await expect(element(by.text('Forgot Password?'))).toBeVisible();
  })
  it('includes a link to create a new account', async () => {
    await expect(element(by.text('Create Account'))).toBeVisible();
  })
  it('includes a button to sign in', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible();
  })
  it('successfully logs in the user', async () => {
    await element(by.id('authenticator__text-field__input-username')).typeText('stewbbb');
    await element(by.id('authenticator__text-field__input-password')).typeText('QcI814u2');
    await element(by.text('Sign in')).tap();
    await waitFor(element(by.text('Posts'))).toBeVisible().withTimeout(5000);
  })
});
