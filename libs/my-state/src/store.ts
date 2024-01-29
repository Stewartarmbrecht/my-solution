import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './postsSlice'
import { authReducer, syncReducer } from '@my-sample/my-backend'
import { userReducer } from './userSlice'
// ...

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    sync: syncReducer,
    user: userReducer,
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store;
