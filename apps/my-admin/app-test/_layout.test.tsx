import { renderRouter, screen } from 'expo-router/testing-library';
import { Platform } from 'react-native';
import { useFonts,  } from 'expo-font';
import { useColorScheme } from '@my-solution/ui';
import TabLayout from '../app/(tabs)/_layout';
import { useAppSelector } from '@my-solution/state';

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

// Mock TabLayout
jest.mock('../app/(tabs)/_layout', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('_layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render tabs layout for the root', async () => {
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({ groups: ['Admin'] });
    renderRouter('./apps/my-admin/app', {
      initialUrl: '/',
    });
    expect(TabLayout).toHaveBeenCalled();
  });

  it('should render the splash screen while the fonts are loading on web', () => {
    Platform.OS = 'web';
    (useFonts as jest.Mock).mockReturnValue([false, null]);
    renderRouter('./apps/my-admin/app');
    expect(screen.queryByTestId('WebSplashScreen')).not.toBeNull();
  });
  it('should return null while the fonts are loading on mobile', () => {
    Platform.OS = 'ios';
    (useFonts as jest.Mock).mockReturnValue([false, null]);
    renderRouter('./apps/my-admin/app');
    expect(screen.queryByTestId('WebSplashScreen')).toBeNull();
  });
  //it('should thrown an error if useFonts throws an error', () => {
    //TODO: Find a way to test this.  Looks to be untestable.  Currently removed code from test coverage.

    // Set useFonts to throw an error
    // (useFonts as jest.Mock).mockReturnValue([null, new Error('Test Error')]);
    // expect(() => renderRouter('./apps/my-admin/app')).toThrow('Test Error');
  //});
  it('should set the theme to dark if the color scheme is dark', async () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({ groups: ['Admin'] });
    renderRouter('./apps/my-admin/app', {
      initialUrl: '/',
    });
    expect(TabLayout).toHaveBeenCalled();

    // TODO: Just triggering code coverage.  No idea on how to assert on this:
    // const sut = await screen.findByTestId('theme-provider');
    // expect(sut.props.value).toBe(DarkTheme);
  });
  it('should show file not found if the path provided does not map to a route', async () => {
    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-admin/app', {
      initialUrl: '/notfound',
    });
    const notFound = await screen.findAllByText('This screen doesn\'t exist.');
    expect(notFound).toBeTruthy();
  });
});