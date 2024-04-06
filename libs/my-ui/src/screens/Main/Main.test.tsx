import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
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
  it('should render the app title', async () => {
    const { getByTestId } = render(<Main />);
    await waitFor(() => {
      expect(getByTestId('heading')).toHaveTextContent('Welcome to MyApp 👋');
    });
  });

  it('should render the app version', async () => {
    const { getByText } = render(<Main />);
    await waitFor(() => {
      expect(getByText('v0.0.1 Update 002')).toBeTruthy();
    });
  });

  it('should render MyComponent', async () => {
    render(<Main />);
    expect(MyComponent as jest.Mock).toHaveBeenCalled();
  });

  it('should render MyPosts', async () => {
    render(<Main />);
    expect(MyPosts as jest.Mock).toHaveBeenCalled();
  });
});