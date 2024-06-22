import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../posts/postsSlice";
import { userLoggedIn, userLoggedOut } from "@my-solution/shared";
import { AppStore } from "../store";
import { syncReducer } from "@my-solution/backend";
import { userReducer } from "./userSlice";

describe('userSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
        sync: syncReducer,
        user: userReducer,
      },
    });
  });

  it('should update the user when userLoggedIn action is dispatched.', () => {
    store.dispatch(userLoggedIn({ userName: 'user', userEmail: 'userEmail', groups: ['Admin'] }));

    const state = store.getState().user;

    expect(state.userName).toBe('user');
    expect(state.userEmail).toBe('userEmail');
    expect(state.groups).toEqual(['Admin']);
  });

  it('should clear the user when userLoggedOut action is dispatched.', () => {
    store.dispatch(userLoggedIn({ userName: 'user', userEmail: 'userEmail', groups: ['Admin']}));

    const state = store.getState().user;

    expect(state.userName).toBe('user');
    expect(state.userEmail).toBe('userEmail');
    expect(state.groups).toEqual(['Admin']);

    store.dispatch(userLoggedOut());

    const clearedState = store.getState().user;

    expect(clearedState.userName).toBeUndefined();
    expect(clearedState.userEmail).toBeUndefined();
    expect(clearedState.groups).toBeUndefined();
  });
});
