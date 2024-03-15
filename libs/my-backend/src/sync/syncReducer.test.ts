/* eslint-disable import/first */
jest.mock('./addPostData', () => ({
  addPostData: jest.fn(),
}));

jest.mock('./deletePostData', () => ({
  deletePostData: jest.fn(),
}));

jest.mock('@aws-amplify/datastore', () => ({
  initSchema: jest.fn().mockReturnValue({ PostData:{} }),
}));

import { Post, postAdded, postDeleted } from '@my-solution/my-shared';
import { syncReducer } from './syncReducer';
import { PostStatus } from '../models';
import { addPostData } from './addPostData';
import { deletePostData } from './deletePostData';


describe('syncReducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call addPostData when postAdded action is dispatched', () => {
    const initialState: never[] = [];
    const post: Post = { id: '1', title: 'New Post', status: PostStatus.ACTIVE };

    const nextState = syncReducer(initialState, postAdded(post));

    expect(addPostData).toHaveBeenCalledWith(post);
    expect(nextState).toEqual(initialState);
  });

  it('should call deletePostData when postDeleted action is dispatched', () => {
    const initialState: never[] = [];
    const post: Post = { id: '1', title: 'Deleted Post', status: PostStatus.ACTIVE };

    const nextState = syncReducer(initialState, postDeleted(post));

    expect(deletePostData).toHaveBeenCalledWith(post);
    expect(nextState).toEqual(initialState);
  });
});