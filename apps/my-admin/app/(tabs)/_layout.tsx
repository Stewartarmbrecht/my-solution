import React from 'react';
import { Link, Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import { AccessDenied, AdminBanner } from '@my-solution/features';
import { BookOpen, Button, Info, MessageCircle, Settings, YStack, useMedia, useTheme } from '@my-solution/ui';
import { selectUser, useAppSelector } from '@my-solution/state';
import { logRaw } from '@my-solution/shared';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const theme = useTheme();
  const accentColor = theme.accentColor.get();
  const backgroundColor = theme.backgroundColor?.get();
  const media = useMedia();

  const user = useAppSelector(selectUser);
  if (!user.groups || !user.groups.includes('Admin')) {
    logRaw('User is not an admin, redirecting to /', user.groups);
    return (<AccessDenied />);
  }

  if (media.gtMd) {
    // Use a basic custom layout on web.
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AdminBanner />
        <Drawer screenOptions={{
            drawerType: 'permanent',
            headerLeft: () => null,
            drawerStyle: {
              width: 175,
            }
          }}
          useLegacyImplementation={false}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: 'Posts',
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Button unstyled p="$0" m="$4">
                    <Info color={accentColor} testID='info-icon' />
                  </Button>
                </Link>
              ),
            }}
          />
          <Drawer.Screen
            name="docs"
            options={{
              title: 'Documentation',
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              title: 'Settings',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    );
  }
  return (
    <YStack f={1}>
      <Tabs
        screenOptions={{
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: true,
          tabBarActiveTintColor: backgroundColor,
        }}
        sceneContainerStyle={{
          flex: 1,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Posts',
            tabBarIcon: ({ color }) => <MessageCircle color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Button unstyled p="$0" m="$4">
                  <Info color={accentColor} testID='info-icon' />
                </Button>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="docs"
          options={{
            title: 'Documentation',
            tabBarIcon: ({ color }) => <BookOpen color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }}
        />
      </Tabs>
    </YStack>
  );
}
