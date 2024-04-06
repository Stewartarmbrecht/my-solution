
import React from 'react';

import { View } from '../View';
import { Text } from '../Text';

/* eslint-disable-next-line */
export interface MyComponentProps {
}


export function MyComponent(props: MyComponentProps) {
  return (
    <View
      darkColor="rgba(255,255,255,0.05)"
      lightColor="rgba(0,0,0,0.05)"
    >
      <Text
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Welcome to My Component!
      </Text>
    </View>
  );
}
