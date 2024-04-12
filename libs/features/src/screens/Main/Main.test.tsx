import React from 'react';
import { render } from '@testing-library/react-native';
import { Main } from './Main';
import { MyComponent } from '../../components/MyComponent';
import { MyPosts } from '../../components/MyPosts';

// Mock My Component
jest.mock('../../components/MyComponent', () => ({
  MyComponent: jest.fn().mockImplementation(() => null),
}));

// Mock My Posts
jest.mock('../../components/MyPosts', () => ({
  MyPosts: jest.fn().mockImplementation(() => null),
}));

describe('Main', () => {
  it('should render MyComponent', async () => {
    render(<Main />);
    expect(MyComponent as jest.Mock).toHaveBeenCalled();
  });

  it('should render MyPosts', async () => {
    render(<Main />);
    expect(MyPosts as jest.Mock).toHaveBeenCalled();
  });
});