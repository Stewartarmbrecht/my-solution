import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { Settings } from './Settings';
import { Provider } from 'react-redux';
import { store, useAppSelector } from '@my-solution/state';
import { signOut } from '@my-solution/backend';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

// Mock dispatch
jest.mock('@my-solution/state', () => ({
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
jest.mock('@my-solution/backend', () => ({
  signOut: jest.fn(),
}));


describe('Main', () => {
  it('should render the users name', () => {
    // Mock the user being logged in
    (useAppSelector as unknown as jest.Mock).mockReturnValue({ userName: 'myusername' });
    const { getByText } = renderWithTamagui(<Provider store={store}><Settings /></Provider>);
    expect(getByText('Hello there myusername,')).toBeTruthy();
  });
  it('should dispatch a userLoggedOut action when the sign out button is pressed', async () => {
    const { getByText } = renderWithTamagui(<Provider store={store}><Settings /></Provider>);
    const signOutButton = getByText('Sign Out');
    await act(async () => {
      fireEvent.press(signOutButton);
    });
    // expect the signOut function to be called
    expect(signOut as jest.Mock).toHaveBeenCalled();
  });
});