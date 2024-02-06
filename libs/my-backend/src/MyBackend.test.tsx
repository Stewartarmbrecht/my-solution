import React from 'react';
import { Text } from 'react-native';
import { MyBackend, MyBackendProps } from './MyBackend';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { render, waitFor } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { getCurrentUser } from 'aws-amplify/auth';
import { get } from 'http';

jest.mock('./aws-exports', () => ({
  default: {},
}));
jest.mock('aws-amplify', () => ({
  Amplify: {
    configure: jest.fn(),
  },
}));
jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
}));
jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    configure: jest.fn(),
  },
  initSchema: jest.fn().mockReturnValue({ PostData: {} }),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('./sync/useSynchronizer', () => ({
  useSynchronizer: jest.fn(),
}));


describe('MyBackend', () => {
  const defaultProps: MyBackendProps = {
    children: <Text>MyBackend</Text>,
  };

  it('should configure Amplify', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    render(<MyBackend {...defaultProps} />);
    expect(Amplify.configure).toHaveBeenCalledWith(awsExports);
  });

  it('should configure the Amplify Datastore', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    render(<MyBackend {...defaultProps} />);
    expect(DataStore.configure).toHaveBeenCalled();
  });

  it('should get the current user and dispatch the userLoggedIn action', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (getCurrentUser as jest.Mock).mockResolvedValue({ username: 'testuser' });
    render(<MyBackend {...defaultProps} />);
    await waitFor(() => expect(getCurrentUser).toHaveBeenCalled());
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({
      type: 'user/userLoggedIn',
      payload: {
        userEmail: 'dontknowthat@yet.com',
        userName: 'testuser',
      },
    }));
  });
});