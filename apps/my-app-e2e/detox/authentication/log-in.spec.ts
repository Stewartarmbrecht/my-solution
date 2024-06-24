import { element, by, expect, device } from 'detox';

describe('MyApp', () => {
  beforeEach(async () => {
    //await device.openURL({url: 'exp+my-app://'});
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
    await element(by.id('authenticator__text-field__input-username')).typeText(Cypress.env('USERNAME'));
    await element(by.id('authenticator__text-field__input-password')).typeText(Cypress.env('PASSWORD'));
    await element(by.text('Sign in')).tap();
    await expect(element(by.id('post-list'))).toBeVisible();
  })
});
