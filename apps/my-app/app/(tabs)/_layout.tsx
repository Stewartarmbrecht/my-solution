import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { Colors, useColorScheme, TabBarIcon } from '@my-solution/my-ui';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // if (Platform.OS === 'web') {
  //   // Use a basic custom layout on web.
  //   return (
  //     <div style={{ flex: 1 }}>
  //       <header>
  //         <Link href="/"><Text>Home</Text></Link>
  //         <Link href="/two"><Text>Two</Text></Link>
  //       </header>
  //       <Slot />
  //     </div>
  //   );
  // }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[/*istanbul ignore next*/colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
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
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
