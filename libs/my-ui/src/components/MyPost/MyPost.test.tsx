import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { MyPost } from './MyPost';
import { PostStatus } from '@my-solution/my-shared';
import { useAppDispatch } from '@my-solution/my-state';

jest.mock('@my-solution/my-state', () => ({
  useAppDispatch: jest.fn(),
}));

describe('MyPost', () => {
  it('should render the post title', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = render(<MyPost post={post} />);
    const title = getByText(post.title);
    expect(title).toBeTruthy();
  });
  it('should render a delete button', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = render(<MyPost post={post} />);
    const deleteButton = getByText('X');
    expect(deleteButton).toBeTruthy();
  });
  it('should dispatch a postDeleted action when delete button is pressed', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const post = {
      id: '1',
      title: 'My Post',
      status: PostStatus.ACTIVE,
      content: 'This is my post',
    };
    const { getByText } = render(<MyPost post={post} />);
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(dispatch).toHaveBeenCalledWith({ type: 'posts/postDeleted', payload: post });
  });
});