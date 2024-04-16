import React from 'react';
import { MyPosts } from './MyPosts';
import { useAppSelector } from '@my-solution/state';
import { MyPost } from '../MyPost';
import { AddPost } from '../AddPost';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

//mock useAppSelector
jest.mock('@my-solution/state', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

//spy on MyPost
jest.mock('../MyPost', () => ({
  MyPost: jest.fn(() => null),
}));

//mock AddPost
jest.mock('../AddPost', () => ({
  AddPost: jest.fn(() => null),
}));

describe('MyPosts', () => {
  it('should render a MyPost for each post', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([{
      id: '1',
      title: 'My Post',
      status: 'ACTIVE',
      content: 'This is my post',
    }, {
      id: '2',
      title: 'My Second Post',
      status: 'ACTIVE',
      content: 'This is my second post',
    }]);
    renderWithTamagui(<MyPosts />);
    expect(MyPost).toHaveBeenCalledWith({ post: { id: '1', title: 'My Post', status: 'ACTIVE', content: 'This is my post' } }, {});
    expect(MyPost).toHaveBeenCalledWith({ post: { id: '2', title: 'My Second Post', status: 'ACTIVE', content: 'This is my second post' } }, {});
  });
  it('should render an AddPost', () => {
    renderWithTamagui(<MyPosts />);
    expect(AddPost).toHaveBeenCalledWith({}, {});
  });
});