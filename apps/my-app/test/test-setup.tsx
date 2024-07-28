import '@testing-library/jest-native/extend-expect';
process.env.LOGGING = 'false';

import 'react-native-gesture-handler/jestSetup.js';
import React from 'react';

jest.mock('@react-native-async-storage/async-storage', () => 
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@my-solution/state', () => {
  const actual = jest.requireActual('@my-solution/state');
  const Provider = jest.requireActual('react-redux').Provider;
  const store = jest.requireActual('@my-solution/state').store;
  return {
    ...actual,
    MyData: (props: { children?: React.ReactNode }) => {
      return (
        <Provider store={store}>
          {props.children}
        </Provider>
      );
    }
  }   
});
