import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import { useFonts } from 'expo-font';
import { useMedia } from '@my-solution/ui';

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

describe('_layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render tabs when on a small device width', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: false });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
      initialUrl: '/',
    });
    const tabOne = await screen.findAllByText('Posts');
    expect(tabOne).toBeTruthy();
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  }, 60000 /** set to 60s because ci timing out. */);
  it('should render Documentation Tab', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: false });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
      initialUrl: '/docs',
    });
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
  });

  it('should render Settings Tab', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: false });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
      initialUrl: '/settings',
    });
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  });

  it('should render drawers on screens larger than small', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: true });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
      initialUrl: '/',
    });
    const tabOne = await screen.findAllByText('Posts');
    expect(tabOne).toBeTruthy();
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  });
  it('should render Documentation Drawer Tab on screens larger than small', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: true });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
      initialUrl: '/docs',
    });
    const tabTwo = await screen.findAllByText('Documentation');
    expect(tabTwo).toBeTruthy();
  });
  it('should render Settings Drawer Tab on screens larger than small', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: true });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
      initialUrl: '/settings',
    });
    const settings = await screen.findAllByText('Settings');
    expect(settings).toBeTruthy();
  });

  it('should render an info icon in for tab one', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: false });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
      initialUrl: '/',
    });
    const infoIcon = await screen.findAllByTestId('info-icon');
    expect(infoIcon).toBeTruthy();
  }, 30000);
  it('should launch a modal window when the user presses the info icon', async () => {
    (useMedia as jest.Mock).mockReturnValue({ gtMd: false });

    (useFonts as jest.Mock).mockReturnValue([true, null]);
    renderRouter('./apps/my-site/app', {
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
  }, 30000);
});