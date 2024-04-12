import React from 'react';
import { render } from '@testing-library/react-native';
import { EditScreenInfo } from './EditScreenInfo';

describe('EditScreenInfo', () => {
  it('should render the correct path', () => {
    const path = '/workspaces/my-solution/libs/features/src/EditScreenInfo.tsx';
    const { getByText } = render(<EditScreenInfo path={path} />);
    const pathElement = getByText(path);
    expect(pathElement).toBeTruthy();
  });

  it('should render the correct instructions', () => {
    const { getByText } = render(<EditScreenInfo path="" />);
    const instructionsElement = getByText('Change any of the text, save the file, and your app will automatically update.');
    expect(instructionsElement).toBeTruthy();
  });

  it('should render the help link', () => {
    const { getByText } = render(<EditScreenInfo path="" />);
    const helpLinkElement = getByText("Tap here if your app doesn't automatically update after making changes");
    expect(helpLinkElement).toBeTruthy();
  });
});