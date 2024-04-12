import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Platform } from 'react-native';

import { Colors, useColorScheme, TabBarIcon, Banner, View } from '@my-solution/features';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const colorScheme = useColorScheme();

  if (Platform.OS === 'web') {
    // Use a basic custom layout on web.
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Banner />
        <Drawer screenOptions={{
          drawerType: 'permanent',
        }}
          useLegacyImplementation={false}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: 'Tasks',
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="info-circle"
                        size={25}
                        color={Colors[/*istanbul ignore next*/colorScheme ?? 'light'].text}
                        style={{ marginRight: 15, opacity: /*istanbul ignore next*/pressed ? 0.5 : 1 }}
                        testID='info-icon'
                      />
                    )}
                  </Pressable>
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
        </Drawer>
      </GestureHandlerRootView>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Banner />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[/*istanbul ignore next*/colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: true,
          headerStatusBarHeight: 0,
        }}
        sceneContainerStyle={{
          flex: 1,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[/*istanbul ignore next*/colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: /*istanbul ignore next*/pressed ? 0.5 : 1 }}
                      testID='info-icon'
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="docs"
          options={{
            title: 'Documentation',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
