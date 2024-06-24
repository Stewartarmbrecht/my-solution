import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { AccessDenied } from './AccessDenied';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
import { signOut } from '@my-solution/backend';

// Mock the signOut function
jest.mock('@my-solution/backend', () => ({
  signOut: jest.fn(),
}));

describe('Access Denied', () => {
  it('should tell the user access was denied', () => {
    const { getByText } = renderWithTamagui(<AccessDenied />);
    expect(getByText('Access Denied')).toBeTruthy();
    expect(getByText('You do not have access.  Please click Sign Out and then sign in as a user that does.')).toBeTruthy();
  });
  it('should render a Sign Out button that signs the user out.', () => {
    const { getByText } = renderWithTamagui(<AccessDenied />);
    const signOutButton = getByText('Sign Out');
    expect(signOutButton).toBeTruthy();
    fireEvent.press(signOutButton);
    expect(signOut).toHaveBeenCalled();
  });
});