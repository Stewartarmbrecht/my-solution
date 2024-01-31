/* istanbul ignore file */
export { MyData } from './MyData';
export { useAppDispatch, useAppSelector, useAppStore } from './hooks';
export { 
  selectAllPosts,
  selectPostById,
  selectPostIds 
} from './posts/postsSlice';
export {
  postAdded,
  postDeleted
} from '@my-sample/my-shared';
export { store } from './store';
export { selectUser } from './user/userSlice';
