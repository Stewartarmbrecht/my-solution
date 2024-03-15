import { authReducer } from './authReducer';
import { userLoggedOut } from '@my-solution/my-shared';
import { signOut } from './signOut';
jest.mock('./signOut', () => ({
  signOut: jest.fn(),
}));

describe('authReducer', () => {
  it('should handle userLoggedOut action', () => {
    const initialState = {};
    const action = userLoggedOut();
    authReducer(initialState, action);

    // Assert that the signOut function is called
    expect(signOut).toHaveBeenCalled();
  });
});