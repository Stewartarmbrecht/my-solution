import React from 'react';
import { Main } from './Main';
import { PostList } from '../../components/PostList';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

// Mock My Posts
jest.mock('../../components/PostList', () => ({
  PostList: jest.fn().mockImplementation(() => null),
}));

describe('Main', () => {
  it('should render PostList', async () => {
    renderWithTamagui(<Main />);
    expect(PostList as jest.Mock).toHaveBeenCalled();
  });
});