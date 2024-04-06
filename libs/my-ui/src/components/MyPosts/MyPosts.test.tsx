import React from 'react';
import { render } from '@testing-library/react-native';
import { MyPosts } from './MyPosts';
import { useAppSelector } from '@my-solution/my-state';
import { MyPost } from '../MyPost';
import { AddPost } from '../AddPost';

//mock useAppSelector
jest.mock('@my-solution/my-state', () => ({
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
    render(<MyPosts />);
    expect(MyPost).toHaveBeenCalledWith({ post: { id: '1', title: 'My Post', status: 'ACTIVE', content: 'This is my post' } }, {});
    expect(MyPost).toHaveBeenCalledWith({ post: { id: '2', title: 'My Second Post', status: 'ACTIVE', content: 'This is my second post' } }, {});
  });
  it('should render an AddPost', () => {
    render(<MyPosts />);
    expect(AddPost).toHaveBeenCalledWith({}, {});
  });
  it('should label the post with "Posts:"', () => {
    const { getByText } = render(<MyPosts />);
    expect(getByText('Posts:')).toBeTruthy();
  });
});