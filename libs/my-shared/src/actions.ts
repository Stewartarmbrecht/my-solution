import { createAction } from "@reduxjs/toolkit";
import { Post } from "./types/Post";

export const postDeletedViaSync = createAction<Post>('posts/postDeletedViaSync');
export const postAddedOrUpdatedViaSync = createAction<Post>('posts/postAddedOrUpdatedViaSync');
export const postsLoadedViaSync = createAction<Post[]>('posts/postsLoadedViaSync');

export const postAdded = createAction<Post>('posts/postAdded');
export const postDeleted = createAction<Post>('posts/postDeleted');


