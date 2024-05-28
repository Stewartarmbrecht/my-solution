/* eslint-disable import/first */
jest.mock('./aws-exports', () => ({
  default: {},
}));

import React from 'react';
import { Text } from 'react-native';
import { Backend, BackendProps } from './Backend';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { render, waitFor } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { useSynchronizer } from './sync/useSynchronizer';

jest.mock('aws-amplify/utils', () => ({
  Hub: {
    listen: jest.fn(),
  },
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


describe('Backend', () => {
  const defaultProps: BackendProps = {
    children: <Text>Backend</Text>,
  };
  
  beforeEach(() => {
    (Hub.listen as jest.Mock).mockImplementation((channel, callback) => {
      callback({
        payload: {
          event: 'signedIn',
          data: { username: 'testuser', email: 'someemail@somewhere.com' }
        },
      });
      return jest.fn();
    });
  });

  it('should configure Amplify', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    render(<Backend {...defaultProps} />);
    expect(Amplify.configure).toHaveBeenCalledWith(awsExports);
  });

  it('should configure the Amplify Datastore', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    render(<Backend {...defaultProps} />);
    expect(DataStore.configure).toHaveBeenCalled();
  });

  it('should get the current user and dispatch the userLoggedIn action', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (getCurrentUser as jest.Mock).mockResolvedValue({ username: 'testuser' });
    render(<Backend {...defaultProps} />);
    await waitFor(() => expect(getCurrentUser).toHaveBeenCalled());
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({
      type: 'user/userLoggedIn',
      payload: {
        userEmail: 'dontknowthat@yet.com',
        userName: 'testuser',
      },
    }));
  });

  it('should call useSynchronizer with the isUserLoggedIn state', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    render(<Backend {...defaultProps} />);
    expect(useSynchronizer).toHaveBeenCalledWith(true);
  });

  it('should set the userLoggedIn state to true when the hub raises the signedIn in event', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (Hub.listen as jest.Mock).mockImplementation((channel, callback) => {
      callback({
        payload: {
          event: 'signedOut'
        },
      });
      return jest.fn();
    });
    // set getCurrentUser to throw an exception.
    (getCurrentUser as jest.Mock).mockRejectedValue(new Error('User not found'));
    render(<Backend {...defaultProps} />);
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({ type: 'user/userLoggedOut' }));
  });
});