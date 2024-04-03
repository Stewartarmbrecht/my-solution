import { renderRouter, screen } from 'expo-router/testing-library';
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

jest.mock('../components/TabBarIcon', () => ({
  TabBarIcon: () => null,
}));


describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render tab one', async () => {
    renderRouter('./apps/my-app/app', {
      initialUrl: '/',
    });
    const tabOne = await screen.findAllByText('Tab One');
    expect(tabOne).toBeTruthy();
  });

  it('should render tab two', async () => {
    renderRouter('./apps/my-app/app', {
      initialUrl: '/two',
    });
    const tabTwo = await screen.findAllByText('Tab Two');
    expect(tabTwo).toBeTruthy();
  });

  it('should render the splash screen while the fonts are loading', () => {
    Platform.OS = 'web';
    (useFonts as jest.Mock).mockReturnValue([false, null]);
    renderRouter('./apps/my-app/app');
    expect(screen.queryByTestId('web-splash-screen')).not.toBeNull();
  });
});