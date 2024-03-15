import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../posts/postsSlice";
import { userLoggedIn, userLoggedOut } from "@my-solution/my-shared";
import { AppStore } from "../store";
import { authReducer, syncReducer } from "@my-solution/my-backend";
import { userReducer } from "./userSlice";

describe('userSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
        sync: syncReducer,
        user: userReducer,
        auth: authReducer,
      },
    });
  });

  it('should update the user when userLoggedIn action is dispatched.', () => {
    store.dispatch(userLoggedIn({ userName: 'user', userEmail: 'userEmail' }));

    const state = store.getState().user;

    expect(state.userName).toBe('user');
    expect(state.userEmail).toBe('userEmail');
  });

  it('should clear the user when userLoggedOut action is dispatched.', () => {
    store.dispatch(userLoggedIn({ userName: 'user', userEmail: 'userEmail' }));

    const state = store.getState().user;

    expect(state.userName).toBe('user');
    expect(state.userEmail).toBe('userEmail');

    store.dispatch(userLoggedOut());

    const clearedState = store.getState().user;

    expect(clearedState.userName).toBeUndefined();
    expect(clearedState.userEmail).toBeUndefined();
  });
});
