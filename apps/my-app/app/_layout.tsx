import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import 'core-js/full/symbol/async-iterator';
// Added next 3 lines for tamagui.
// Removing to get tests to pass.
// import '../tamagui-web.css'
import { TamaguiProvider, View, colors, tamaguiConfig } from '@my-solution/ui'
// import { tamaguiConfig } from '../tamagui.config'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { MyState } from '@my-solution/state';
import { Backend } from '@my-solution/backend';
import { Platform, useColorScheme } from 'react-native';
import { WebSplashScreen } from '@my-solution/features';
import { logRaw } from '@my-solution/shared';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Added next two lines for tamagui. (Removing to get tests to run)
    // Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    // InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    // istanbul ignore next
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    if (Platform.OS === 'web') {
      return <WebSplashScreen />;
    } else {
      return null;
    }
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  logRaw('colorScheme', colorScheme);
  DefaultTheme.colors.primary = colors.blue.blue8;
  DarkTheme.colors.primary = colors.blueDark.blue8;
  //DefaultTheme.colors.background = colorScheme === 'dark' ? '#000000' : '#b8dff6';
  

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={/*istanbul ignore next*/colorScheme === 'dark' ? 'dark_blue' : 'light_blue'}>
      <ThemeProvider value={/*istanbul ignore next*/colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MyState>
          <Backend>
            <View f={1}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              </Stack>
            </View>
          </Backend>
        </MyState>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
