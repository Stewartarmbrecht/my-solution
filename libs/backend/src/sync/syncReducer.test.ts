/* eslint-disable import/first */
jest.mock('./addDataItem', () => ({
  addDataItem: jest.fn(),
}));

jest.mock('./deleteDataItem', () => ({
  deleteDataItem: jest.fn(),
}));

jest.mock('@aws-amplify/datastore', () => ({
  initSchema: jest.fn().mockReturnValue({ DataItem:{} }),
}));

import { Post, postAdded, postDeleted } from '@my-solution/shared';
import { syncReducer } from './syncReducer';
import { PostStatus } from '../models';
import { addDataItem } from './addDataItem';
import { deleteDataItem } from './deleteDataItem';


describe('syncReducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call addDataItem when postAdded action is dispatched', () => {
    const initialState: never[] = [];
    const post: Post = { id: '1', title: 'New Post', status: PostStatus.ACTIVE };

    const nextState = syncReducer(initialState, postAdded(post));

    expect(addDataItem).toHaveBeenCalledWith(post);
    expect(nextState).toEqual(initialState);
  });

  it('should call deleteDataItem when postDeleted action is dispatched', () => {
    const initialState: never[] = [];
    const post: Post = { id: '1', title: 'Deleted Post', status: PostStatus.ACTIVE };

    const nextState = syncReducer(initialState, postDeleted(post));

    expect(deleteDataItem).toHaveBeenCalledWith(post);
    expect(nextState).toEqual(initialState);
  });
});