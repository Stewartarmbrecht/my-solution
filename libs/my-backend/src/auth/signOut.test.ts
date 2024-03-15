import { signOut } from './signOut';
import { DataStore } from '@aws-amplify/datastore';
import { signOut as authSignOut } from '@aws-amplify/auth';
import { logError } from '@my-solution/my-shared';

jest.mock('@aws-amplify/datastore', () => ({
  DataStore: {
    stop: jest.fn(),
    clear: jest.fn(),
  },
}));

jest.mock('@aws-amplify/auth', () => ({
  signOut: jest.fn(),
}));

jest.mock('@my-solution/my-shared', () => ({
  logError: jest.fn(),
  logCall: jest.fn(),
}));

describe('signOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should stop and clear the data store then sign out the user using the amplify auth library.', async () => {
    await signOut();

    expect(DataStore.stop).toHaveBeenCalled();
    expect(DataStore.clear).toHaveBeenCalled();
    expect(authSignOut).toHaveBeenCalled();
  });

  it('should log error when signOut throws an error', async () => {
    const error = new Error('Sign out error');
    (authSignOut as jest.Mock).mockRejectedValueOnce(error);

    await signOut();

    expect(logError).toHaveBeenCalledWith(error);
  });
});