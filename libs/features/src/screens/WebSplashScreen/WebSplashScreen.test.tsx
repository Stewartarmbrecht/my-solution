import React from 'react';
import { render } from '@testing-library/react-native';
import { WebSplashScreen } from './WebSplashScreen';

describe('WebSplashScreen', () => {
  it('should render the splash screen', () => {
    const { getByTestId } = render(<WebSplashScreen />);
    expect(getByTestId('web-splash-screen')).toBeTruthy();
  });
});