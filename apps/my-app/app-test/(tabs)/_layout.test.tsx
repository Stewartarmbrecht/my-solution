import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import { Platform } from 'react-native';
import { useFonts,  } from 'expo-font';

jest.mock('expo-font', () => {
  const actual = jest.requireActual('expo-font');
  return {
    ...actual,
    useFonts: jest.fn().mockImplementation(actual.useFonts),
  }
});

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(),
  preventAutoHideAsync: jest.fn(),
}));

jest.mock('../../components/TabBarIcon', () => ({
  TabBarIcon: () => null,
}));

describe('_layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render tabs', async () => {
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/',
    });
    const tabOne = await screen.findAllByText('Tab One');
    expect(tabOne).toBeTruthy();
    const tabTwo = await screen.findAllByText('Tab Two');
    expect(tabTwo).toBeTruthy();
  });
  it('should render tab two', async () => {
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/two',
    });
    const tabTwo = await screen.findAllByText('Tab Two');
    expect(tabTwo).toBeTruthy();
  });

  it('should render an info icon in for tab one', async () => {
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/',
    });
    const infoIcon = await screen.findAllByTestId('info-icon');
    expect(infoIcon).toBeTruthy();
  });
  it('should launch a modal window when the user presses the info icon', async () => {
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/',
    });
    const infoIcon = await screen.findAllByTestId('info-icon');
    expect(infoIcon).toBeTruthy();
    // Click the info icon
    await act(async () =>  {
      fireEvent.press(infoIcon[0]);
    });
    // expect the modal window to be visible
    const modal = await screen.findAllByText('Modal');
    expect(modal).toBeTruthy();
  });
});