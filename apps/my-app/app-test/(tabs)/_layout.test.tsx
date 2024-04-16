import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import { useFonts,  } from 'expo-font';
import { Platform } from 'react-native';

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

jest.mock('@my-solution/features', () => {
  const actual = jest.requireActual('@my-solution/features');
  return {
    ...actual,
    TabBarIcon: () => null,
    useColorScheme: jest.fn().mockReturnValue('light'),
  }
});

describe('_layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render tabs', async () => {
    Platform.OS = 'ios';
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/',
    });
    const tabOne = await screen.findAllByText('Posts');
    expect(tabOne).toBeTruthy();
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  }, 10000);
  it('should render Documentation Tab', async () => {
    Platform.OS = 'ios';
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/docs',
    });
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
  }, 10000);

  it('should render Settings Tab', async () => {
    Platform.OS = 'ios';
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/settings',
    });
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  }, 10000);

  it('should render drawers on web', async () => {
    Platform.OS = 'web';
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/',
    });
    const tabOne = await screen.findAllByText('Posts');
    expect(tabOne).toBeTruthy();
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  }, 10000);
  it('should render Documentation Drawer Tab on Web', async () => {
    Platform.OS = 'web';
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/docs',
    });
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
  }, 10000);
  it('should render Settings Drawer Tab on Web', async () => {
    Platform.OS = 'web';
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/settings',
    });
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  }, 10000);

  it('should render an info icon in for tab one', async () => {
    Platform.OS = 'ios';
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-app/app', {
      initialUrl: '/',
    });
    const infoIcon = await screen.findAllByTestId('info-icon');
    expect(infoIcon).toBeTruthy();
  }, 10000);
  it('should launch a modal window when the user presses the info icon', async () => {
    Platform.OS = 'ios';
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
  }, 10000);
});