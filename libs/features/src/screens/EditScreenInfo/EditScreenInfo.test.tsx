import React from 'react';
import { EditScreenInfo } from './EditScreenInfo';
import { renderWithTamagui } from '../../renderWithTamagui.test-util';

describe('EditScreenInfo', () => {
  it('should render the correct path', () => {
    const path = '/workspaces/my-solution/libs/features/src/EditScreenInfo.tsx';
    const { getByText } = renderWithTamagui(<EditScreenInfo path={path} />);
    const pathElement = getByText(path);
    expect(pathElement).toBeTruthy();
  });

  it('should render the correct instructions', () => {
    const { getByText } = renderWithTamagui(<EditScreenInfo path="" />);
    const instructionsElement = getByText('Change any of the text, save the file, and your app will automatically update.');
    expect(instructionsElement).toBeTruthy();
  });

  it('should render the help link', () => {
    const { getByText } = renderWithTamagui(<EditScreenInfo path="" />);
    const helpLinkElement = getByText("Tap here if your app doesn't automatically update after making changes");
    expect(helpLinkElement).toBeTruthy();
  });
});