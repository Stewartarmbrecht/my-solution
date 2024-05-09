import { by, element, expect } from 'detox';

describe('posts', () => {
  beforeEach(async () => {
    await device.openURL({url: 'exp+my-app://'});
    // await device.reloadReactNative();
    await element(by.id('login-username')).typeText('stewbbb');
    await element(by.id('login-password')).typeText('QcI814u2');
    await element(by.id('login-button')).tap();
    await expect(element(by.id('home-screen'))).toBeVisible();
  });


  it('can add new todo items', async () => {
    const newPost = 'This is a test';
    await element(by.id('new-post-name')).typeText(newPost);

    await element(by.id('new-post-submit')).tap();

    await expect(element(by.id('post-item'))).toHaveText(newPost);
  });
});
