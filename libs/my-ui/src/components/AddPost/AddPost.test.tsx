import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AddPost } from './AddPost';
import { useAppDispatch } from '@my-solution/my-state';
jest.mock('@my-solution/my-state', () => ({
  useAppDispatch: jest.fn(),
}));

describe('AddPost', () => {
  it('should update the title when input value changes', () => {
    const { getByPlaceholderText } = render(<AddPost />);
    const inputElement = getByPlaceholderText('New Post Name');

    fireEvent.changeText(inputElement, 'New Post Title');

    expect(inputElement.props.value).toBe('New Post Title');
  });
  it('should dispatch postAdded action when Add button is pressed', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const { getByPlaceholderText, getByText } = render(<AddPost />);
    const inputElement = getByPlaceholderText('New Post Name');
    const addButton = getByText('Add');

    fireEvent.changeText(inputElement, 'New Post Title');
    fireEvent.press(addButton);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith({
      type: 'posts/postAdded',
      payload: {
        id: expect.any(String),
        title: 'New Post Title',
        rating: 5,
        status: 'ACTIVE',
      },
    }));
  });
});