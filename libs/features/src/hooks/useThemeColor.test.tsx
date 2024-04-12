import { useColorScheme } from './useColorScheme';
import { useThemeColor } from './useThemeColor';
import { renderHook } from '@testing-library/react-native';

jest.mock('./useColorScheme', () => ({
  useColorScheme: jest.fn().mockReturnValue('light'),
}));

describe('useThemeColor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the light color from props if available', () => {
    const { result } = renderHook(() =>
      useThemeColor({ light: 'lightColor', dark: 'darkColor' }, 'text')
    );
    expect(result.current).toBe('lightColor');
  });

  it('should return the dark color from props if available', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { result } = renderHook(() =>
      useThemeColor({ light: 'lightColor', dark: 'darkColor' }, 'text')
    );
    expect(result.current).toBe('darkColor');
  });

  it('should return the light color from Colors object if props are not available', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { result } = renderHook(() => useThemeColor({}, 'text'));
    expect(result.current).toBe('#000');
  });
});