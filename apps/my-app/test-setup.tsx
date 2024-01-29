import '@testing-library/jest-native/extend-expect';
import React from 'react';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@my-sample/my-state', () => {
  const actual = jest.requireActual('@my-sample/my-state');
  const Provider = jest.requireActual('react-redux').Provider;
  const store = jest.requireActual('@my-sample/my-state').store;
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
})