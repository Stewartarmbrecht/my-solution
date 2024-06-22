import { by, element, expect, device } from 'detox';

describe('posts', () => {
  beforeEach(async () => {
    console.log('beforeEach', device);
    await device.openURL({ url:'my-app-dev://' });
    // await device.reloadReactNative();
    await element(by.id('authenticator__text-field__input-username')).typeText(process.env.USERNAME);
    await element(by.id('authenticator__text-field__input-password')).typeText(process.env.PASSWORD);
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
