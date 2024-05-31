import * as React from 'react';

import { SiteBanner } from './SiteBanner';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

// Mock the react-native-safe-area-context hook
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('SiteBanner', () => {
  it('should render the Site title', () => {
    (useSafeAreaInsets as unknown as jest.Mock).mockReturnValue({ top: 10 });
    const { getByText } = renderWithTamagui(<SiteBanner />);
    expect(getByText('My Site')).toBeTruthy();
  });
});