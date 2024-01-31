/* instanbul ignore file */
import { createAction } from "@reduxjs/toolkit";
import { Post } from "./types/Post";
import { User } from "./types/User";

export const postDeletedViaSync = createAction<Post>('posts/postDeletedViaSync');
export const postAddedOrUpdatedViaSync = createAction<Post>('posts/postAddedOrUpdatedViaSync');
export const postsLoadedViaSync = createAction<Post[]>('posts/postsLoadedViaSync');

export const postAdded = createAction<Post>('posts/postAdded');
export const postDeleted = createAction<Post>('posts/postDeleted');

export const userLoggedIn = createAction<User>('user/userLoggedIn');
export const userLoggedOut = createAction('user/userLoggedOut');

