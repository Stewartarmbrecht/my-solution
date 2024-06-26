import { by, element, expect } from 'detox';

describe('posts', () => {
  beforeEach(async () => {
    await device.openURL({url: 'exp+my-app://'});
    // await device.reloadReactNative();
    await element(by.id('authenticator__text-field__input-username')).typeText('stewbbb');
    await element(by.id('authenticator__text-field__input-password')).typeText('QcI814u2');
    await element(by.text('Sign in')).tap();
    await expect(element(by.id('post-list'))).toBeVisible();
  });


  it('can add new todo items', async () => {
    const newPost = 'This is a test';
    await element(by.id('new-post-name')).typeText(newPost);

    await element(by.id('new-post-submit')).tap();

    await expect(element(by.id('post-item.title')).atIndex(0)).toHaveText(newPost);
  });
});
