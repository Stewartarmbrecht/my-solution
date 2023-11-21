import React from 'react';
import { render } from '@testing-library/react-native';

import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render successfully', () => {
    const { root } = render(< MyComponent />);
    expect(root).toBeTruthy();
  });
});
