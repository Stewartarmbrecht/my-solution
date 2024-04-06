import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';

import { Banner } from './Banner';
import { Provider } from 'react-redux';
import { store, useAppSelector } from '@my-solution/my-state';
import { signOut } from '@my-solution/my-backend';

// Mock dispatch
jest.mock('@my-solution/my-state', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
  },
  useAppDispatch: jest.fn().mockImplementation(() => jest.fn()),
  useAppSelector: jest.fn(),
  selectUser: jest.fn(),
}));

// Mock signOut
jest.mock('@my-solution/my-backend', () => ({
  signOut: jest.fn(),
}));

describe('Banner', () => {
  it('should render the users name', () => {
    // Mock the user being logged in
    (useAppSelector as unknown as jest.Mock).mockReturnValue({ userName: 'myusername' });
    const { getByText } = render(<Provider store={store}><Banner /></Provider>);
    expect(getByText('Hello there myusername,')).toBeTruthy();
  });
  it('should dispatch a userLoggedOut action when the sign out button is pressed', async () => {
    const { getByText } = render(<Provider store={store}><Banner /></Provider>);
    const signOutButton = getByText('Sign Out');
    await act(async () => {
      fireEvent.press(signOutButton);
    });
    // expect the signOut function to be called
    expect(signOut as jest.Mock).toHaveBeenCalled();
  });
});