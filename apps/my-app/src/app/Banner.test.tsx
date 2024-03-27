import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';

import { Banner } from './Banner';
import { Provider } from 'react-redux';
import { store } from '@my-solution/my-state';
import { userLoggedIn } from '@my-solution/my-shared';

describe('Banner', () => {
  it('should render the users name', () => {
    store.dispatch(userLoggedIn({ userEmail: 'myemail', userName: 'myusername' }));
    const { getByText } = render(<Provider store={store}><Banner /></Provider>);
    expect(getByText('Hello there myusername,')).toBeTruthy();
  });
  it('should dispatch a userLoggedOut action when the sign out button is pressed', async () => {
    store.dispatch(userLoggedIn({ userEmail: 'myemail', userName: 'myusername' }));
    const { getByText } = render(<Provider store={store}><Banner /></Provider>);
    expect(getByText('Hello there myusername,')).toBeTruthy();
    const signOutButton = getByText('Sign Out');
    await act(() => {
      fireEvent.press(signOutButton);
    });
    expect(store.getState().user.userName).toBeUndefined();
  });
});