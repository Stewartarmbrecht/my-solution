import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { AddFeature } from './AddFeature';
import { useAppDispatch } from '@my-solution/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';
jest.mock('@my-solution/state', () => ({
  useAppDispatch: jest.fn(),
}));

describe('AddFeature', () => {
  it('should update the title when input value changes', () => {
    const { getByPlaceholderText } = renderWithTamagui(<AddFeature />);
    const inputElement = getByPlaceholderText('New Feature Name');

    fireEvent.changeText(inputElement, 'New Feature Title');

    expect(inputElement.props.value).toBe('New Feature Title');
  });
  it('should dispatch featureAdded action when Add button is pressed', async () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const { getByPlaceholderText, getByText } = renderWithTamagui(<AddFeature />);
    const inputElement = getByPlaceholderText('New Feature Name');
    const addButton = getByText('Add');

    fireEvent.changeText(inputElement, 'New Feature Title');
    fireEvent.press(addButton);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith({
      type: 'features/featureAdded',
      payload: {
        createdAt: expect.any(String),
        id: expect.any(String),
        title: 'New Feature Title',
        rating: 5,
        status: 'ACTIVE',
      },
    }));
  });
});