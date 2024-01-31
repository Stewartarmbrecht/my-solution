import React, { useEffect } from 'react';
import { render } from '@testing-library/react-native';

import { MyData } from './MyData';
import { useAppDispatch, useAppSelector } from './hooks';
import { userLoggedIn } from '@my-sample/my-shared';
import { selectUser } from './user/userSlice';
import { Text } from 'react-native';

describe('MyData', () => {
  it('should load the store for use by child components', () => {
    const { findByText } = render(<MyData><MyTest /></MyData>);
    expect(findByText("Test User")).toBeTruthy();
  });
});

function MyTest() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userLoggedIn({ userName: 'Test User' }));
  }, [dispatch]);
  const user = useAppSelector(selectUser);
  return <Text>{user.userName}</Text>;
} 