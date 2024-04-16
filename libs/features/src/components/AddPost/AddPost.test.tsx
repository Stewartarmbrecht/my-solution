import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AddPost } from './AddPost';
import { useAppDispatch } from '@my-solution/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
jest.mock('@my-solution/state', () => ({
  useAppDispatch: jest.fn(),
}));

describe('AddPost', () => {
  it('should update the title when input value changes', () => {
    const { getByPlaceholderText } = renderWithTamagui(<AddPost />);
    const inputElement = getByPlaceholderText('New Post Name');

    fireEvent.changeText(inputElement, 'New Post Title');

    expect(inputElement.props.value).toBe('New Post Title');
  });
  it('should dispatch postAdded action when Add button is pressed', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const { getByPlaceholderText, getByText } = renderWithTamagui(<AddPost />);
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