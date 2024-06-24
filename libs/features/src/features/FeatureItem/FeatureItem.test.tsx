import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { FeatureItem } from './FeatureItem';
import { FeatureStatus } from '@my-solution/shared';
import { useAppDispatch } from '@my-solution/state';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

jest.mock('@my-solution/state', () => ({
  useAppDispatch: jest.fn(),
}));

describe('FeatureItem', () => {
  it('should render the feature title', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const feature = {
      id: '1',
      title: 'My Feature',
      status: FeatureStatus.ACTIVE,
      content: 'This is my feature',
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    const title = getByText(feature.title);
    expect(title).toBeTruthy();
  });
  it('should render a delete button', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const feature = {
      id: '1',
      title: 'My Feature',
      status: FeatureStatus.ACTIVE,
      content: 'This is my feature',
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    const deleteButton = getByText('X');
    expect(deleteButton).toBeTruthy();
  });
  it('should dispatch a featureDeleted action when delete button is pressed', () => {
    const dispatch = jest.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    const feature = {
      id: '1',
      title: 'My Feature',
      status: FeatureStatus.ACTIVE,
      content: 'This is my feature',
    };
    const { getByText } = renderWithTamagui(<FeatureItem feature={feature} />);
    const deleteButton = getByText('X');
    fireEvent.press(deleteButton);
    expect(dispatch).toHaveBeenCalledWith({ type: 'features/featureDeleted', payload: feature });
  });
});