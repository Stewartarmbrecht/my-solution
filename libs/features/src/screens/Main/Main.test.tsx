import React from 'react';
import { Main } from './Main';
import { MyPosts } from '../../components/MyPosts';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

// Mock My Posts
jest.mock('../../components/MyPosts', () => ({
  MyPosts: jest.fn().mockImplementation(() => null),
}));

describe('Main', () => {
  it('should render MyPosts', async () => {
    renderWithTamagui(<Main />);
    expect(MyPosts as jest.Mock).toHaveBeenCalled();
  });
});