import React from 'react';
import { render } from '@testing-library/react-native';

import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render successfully', () => {
    const { findByText } = render(< MyComponent />);
    const welcomeMessage = findByText('Welcome to My Component!');
    expect(welcomeMessage).toBeDefined();
  });
});
