
import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface MyComponentProps {
}


export function MyComponent(props: MyComponentProps) {
  return (
    <View>
      <Text>Welcome to My Component!</Text>
    </View>
  );
};


export default MyComponent;
