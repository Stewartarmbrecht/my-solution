import { syncReducer } from './syncReducer';
import { addDataItem } from './addDataItem';
import { deleteDataItem } from './deleteDataItem';
import { addGlobalDataItem } from './addGlobalDataItem';
import { deleteGlobalDataItem } from './deleteGlobalDataItem';

import { Post, PostStatus, postAdded, postDeleted } from '@my-solution/shared';
import { Feature, FeatureStatus, featureAdded, featureDeleted } from '@my-solution/shared';

jest.mock('./addDataItem', () => ({
  addDataItem: jest.fn(),
}));

jest.mock('./deleteDataItem', () => ({
  deleteDataItem: jest.fn(),
}));

jest.mock('./addGlobalDataItem', () => ({
  addGlobalDataItem: jest.fn(),
}));

jest.mock('./deleteGlobalDataItem', () => ({
  deleteGlobalDataItem: jest.fn(),
}));

jest.mock('@aws-amplify/datastore', () => ({
  initSchema: jest.fn().mockReturnValue({ DataItem:{} }),
}));

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
  it('should call addGlobalDataItem when featureAdded action is dispatched', () => {
    const initialState: never[] = [];
    const feature: Feature = { id: '1', title: 'New Feature', status: FeatureStatus.ACTIVE };

    const nextState = syncReducer(initialState, featureAdded(feature));

    expect(addGlobalDataItem).toHaveBeenCalledWith(feature);
    expect(nextState).toEqual(initialState);
  });

  it('should call deleteGlobalDataItem when featureDeleted action is dispatched', () => {
    const initialState: never[] = [];
    const feature: Feature = { id: '1', title: 'Deleted Feature', status: FeatureStatus.ACTIVE };

    const nextState = syncReducer(initialState, featureDeleted(feature));

    expect(deleteGlobalDataItem).toHaveBeenCalledWith(feature);
    expect(nextState).toEqual(initialState);
  });
});